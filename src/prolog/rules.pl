% ===========================================================================
% rules.pl  —  INFERENCE ENGINE (rules, scoring, ranking, explanations)
% All reasoning lives here. Loaded together with laptops.pl + mobiles.pl.
% user_pref/2 facts are asserted by the JS engine before querying.
% ===========================================================================

% --- USER-DESIRED TAGS (derived purely by Prolog from the answers) ---------
desired(T) :- user_pref(usage, U),   usage_tag(U, T).
desired(T) :- user_pref(career, C),  career_tag(C, T).
desired(T) :- user_pref(profile, P), profile_tag(P, T).
desired(gaming)  :- user_pref(gaming, yes).
desired(ai)      :- user_pref(ai, yes).
desired(ai)      :- user_pref(gpu, ai).
desired(gaming)  :- user_pref(gpu, gaming).
desired(camera)  :- user_pref(camera_phone, yes).
desired(gaming)  :- user_pref(gaming_phone, yes).
desired(secure)  :- user_pref(security, yes).
desired(security):- user_pref(security, yes).
desired(battery) :- user_pref(battery, high).
desired(portable):- user_pref(portability, portable).
desired(future)  :- user_pref(future, yes).
desired(T) :- user_pref(brand, B), B \= any, T = brand(B).

usage_tag(gaming, gaming).
usage_tag(programming, programming).
usage_tag(ai, ai).
usage_tag(ai, datascience).
usage_tag(design, design).
usage_tag(video, video).
usage_tag(office, business).
usage_tag(study, student).
usage_tag(browsing, business).

career_tag(software_engineer, programming).
career_tag(ai_engineer, ai).
career_tag(ai_engineer, datascience).
career_tag(data_scientist, datascience).
career_tag(data_scientist, ai).
career_tag(cyber_security, security).
career_tag(ethical_hacker, security).
career_tag(ethical_hacker, linux).
career_tag(graphic_designer, design).
career_tag(video_editor, video).
career_tag(architect, design).
career_tag(business, business).

profile_tag(student, student).
profile_tag(gamer, gaming).
profile_tag(professional, business).

% --- BUDGET LIMIT (15% tolerance over stated budget) -----------------------
budget_limit(Limit) :- user_pref(budget, B), B > 0, Limit is (B * 115) // 100.
budget_limit(1000000) :- \+ ( user_pref(budget, B), B > 0 ).

% --- SCORING (every score derived by Prolog rules from attributes) ---------
lap_gaming(Id, S)      :- laptop(Id,_,_,_,_,Ram,_,_,V,_,_,_,_,_), Raw is V*9 + Ram, clamp(Raw, S).
lap_ai(Id, S)          :- laptop(Id,_,_,_,_,Ram,_,_,V,_,_,_,_,_), Raw is V*7 + Ram*2, clamp(Raw, S).
lap_programming(Id, S) :- laptop(Id,_,_,_,_,Ram,St,_,_,_,_,_,_,_), Raw is Ram*4 + St//40, clamp(Raw, S).
lap_battery(Id, S)     :- laptop(Id,_,_,_,_,_,_,_,_,_,B,_,_,_), Raw is B + 15, clamp(Raw, S).
lap_portability(Id, S) :- laptop(Id,_,_,_,_,_,_,_,_,W,_,_,_,_), Raw is 130 - truncate(W*30), clamp(Raw, S).
lap_productivity(Id,S) :- laptop(Id,_,_,_,_,Ram,St,_,_,_,_,_,_,_), Raw is Ram*3 + St//50 + 20, clamp(Raw, S).

mob_camera(Id, S)   :- mobile(Id,_,_,_,_,_,_,_,C,_,_,_), Raw is C//3 + 20, clamp(Raw, S).
mob_gaming(Id, S)   :- mobile(Id,_,_,_,_,Ram,_,_,_,_,_,_), Raw is Ram*5 + 20, clamp(Raw, S).
mob_battery(Id, S)  :- mobile(Id,_,_,_,_,_,_,Bat,_,_,_,_), Raw is Bat//70, clamp(Raw, S).
mob_charge(Id, S)   :- mobile(Id,_,_,_,_,_,_,_,_,Ch,_,_), Raw is Ch + 10, clamp(Raw, S).

clamp(Raw, 100) :- Raw >= 100, !.
clamp(Raw, 0)   :- Raw =< 0, !.
clamp(Raw, Raw).

% --- ITEM ACCESSORS --------------------------------------------------------
item_tags(laptop, Id, Tags) :- laptop(Id,_,_,_,_,_,_,_,_,_,_,_,_,Tags).
item_tags(mobile, Id, Tags) :- mobile(Id,_,_,_,_,_,_,_,_,_,_,Tags).
item_brand(laptop, Id, Brand) :- laptop(Id,_,Brand,_,_,_,_,_,_,_,_,_,_,_).
item_brand(mobile, Id, Brand) :- mobile(Id,_,Brand,_,_,_,_,_,_,_,_,_).
item_price(laptop, Id, P) :- laptop(Id,_,_,P,_,_,_,_,_,_,_,_,_,_).
item_price(mobile, Id, P) :- mobile(Id,_,_,P,_,_,_,_,_,_,_,_).
item_name(laptop, Id, N) :- laptop(Id,N,_,_,_,_,_,_,_,_,_,_,_,_).
item_name(mobile, Id, N) :- mobile(Id,N,_,_,_,_,_,_,_,_,_,_).

% --- MATCH SCORE (how many desired tags an item provides) ------------------
match_score(Type, Id, Score) :-
    item_tags(Type, Id, Tags),
    findall(1, ( desired(D), is_tag(Type, Id, Tags, D) ), Hits),
    length(Hits, Count),
    Score is Count * 22.

is_tag(Type, Id, _, brand(B)) :- !, item_brand(Type, Id, B).
is_tag(_, _, Tags, T) :- member(T, Tags).

% --- TOTAL SCORE + RANKING -------------------------------------------------
total_score(laptop, Id, Total) :-
    match_score(laptop, Id, M),
    lap_gaming(Id, G), lap_ai(Id, A), lap_programming(Id, P), lap_productivity(Id, Pr),
    Quality is (G + A + P + Pr) // 8,
    Total is M + Quality.
total_score(mobile, Id, Total) :-
    match_score(mobile, Id, M),
    mob_camera(Id, C), mob_gaming(Id, G), mob_battery(Id, B),
    Quality is (C + G + B) // 6,
    Total is M + Quality.

candidate(Type, Score-Id) :-
    item_price(Type, Id, Price),
    budget_limit(Limit),
    Price =< Limit,
    total_score(Type, Id, Score).

ranked(Type, Sorted) :-
    findall(S-Id, candidate(Type, S-Id), Pairs),
    keysort(Pairs, Asc),
    reverse(Asc, Sorted).

% --- EXPLANATIONS ("Why this product?") ------------------------------------
reason(Type, Id, R) :-
    item_tags(Type, Id, Tags), desired(D), is_tag(Type, Id, Tags, D), tag_label(D, R).
reason(laptop, Id, 'Comfortable battery life') :-
    laptop(Id,_,_,_,_,_,_,_,_,_,B,_,_,_), B >= 80.
reason(laptop, Id, 'Lightweight & portable') :-
    laptop(Id,_,_,_,_,_,_,_,_,W,_,_,_,_), W =< 1.4.
reason(laptop, Id, 'Discrete GPU for heavy workloads') :-
    laptop(Id,_,_,_,_,_,_,_,V,_,_,_,_,_), V >= 6.
reason(laptop, Id, 'Plenty of RAM for multitasking') :-
    laptop(Id,_,_,_,_,Ram,_,_,_,_,_,_,_,_), Ram >= 16.
reason(mobile, Id, 'Excellent camera system') :-
    mobile(Id,_,_,_,_,_,_,_,C,_,_,_), C >= 50.
reason(mobile, Id, 'Large all-day battery') :-
    mobile(Id,_,_,_,_,_,_,Bat,_,_,_,_), Bat >= 5000.
reason(mobile, Id, 'Very fast charging') :-
    mobile(Id,_,_,_,_,_,_,_,_,Ch,_,_), Ch >= 60.
reason(Type, Id, 'Within your budget') :-
    item_price(Type, Id, P), budget_limit(L), P =< L.

tag_label(gaming, 'Great for gaming').
tag_label(ai, 'Suited for AI / ML work').
tag_label(datascience, 'Good for data science').
tag_label(programming, 'Ideal for programming').
tag_label(design, 'Strong for design work').
tag_label(video, 'Handles video editing').
tag_label(student, 'Student friendly').
tag_label(business, 'Solid for business / office').
tag_label(budget, 'Budget friendly').
tag_label(premium, 'Premium build & performance').
tag_label(portable, 'Highly portable').
tag_label(battery, 'Long battery life').
tag_label(security, 'Strong security features').
tag_label(secure, 'Strong security features').
tag_label(linux, 'Linux ready').
tag_label(future, 'Future-proof specs').
tag_label(camera, 'Outstanding camera').
tag_label(flagship, 'Flagship-tier device').
tag_label(display, 'Premium display').
tag_label(fastcharge, 'Fast charging support').
tag_label(value, 'Excellent value for money').
tag_label(brand(_), 'Matches your preferred brand').

reasons_atom(Type, Id, Atom) :-
    findall(R, reason(Type, Id, R), Rs0),
    sort(Rs0, Rs1),
    take(5, Rs1, Rs),
    atomic_list_concat(Rs, '||', Atom).

take(0, _, []) :- !.
take(_, [], []) :- !.
take(N, [H|T], [H|R]) :- N > 0, N1 is N - 1, take(N1, T, R).

% --- PUBLIC QUERY: top 5 ranked items with reasons -------------------------
recommend(Type, Rank, Name, Brand, Price, Score, Why) :-
    ranked(Type, Sorted),
    nth1(Rank, Sorted, Score-Id),
    Rank =< 5,
    item_name(Type, Id, Name),
    item_brand(Type, Id, Brand),
    item_price(Type, Id, Price),
    reasons_atom(Type, Id, Why).

laptop_scores(Id, Gaming, Ai, Prog, Battery, Portability, Productivity) :-
    lap_gaming(Id, Gaming), lap_ai(Id, Ai), lap_programming(Id, Prog),
    lap_battery(Id, Battery), lap_portability(Id, Portability), lap_productivity(Id, Productivity).

% --- PUBLIC QUERY: full catalog with headline scores (for Browse page) ------
catalog(laptop, Name, Brand, Price, A, B, C) :-
    laptop(Id, Name, Brand, Price, _,_,_,_,_,_,_,_,_,_),
    lap_gaming(Id, A), lap_ai(Id, B), lap_battery(Id, C).
catalog(mobile, Name, Brand, Price, A, B, C) :-
    mobile(Id, Name, Brand, Price, _,_,_,_,_,_,_,_),
    mob_camera(Id, A), mob_gaming(Id, B), mob_battery(Id, C).
