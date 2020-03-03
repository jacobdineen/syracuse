#Jake Dineen
#9.3

#Tutorial
#http://www.regexpal.com/
#[em] finds all occurrences of e and m
# [A-Z] highlights all capital letters [a-z] highlights all lowercase letters
# . without the brackets finds everything
#[^A-Z] find everything that isn't a capital letters
#step|cat finds all regex matches of step and cat [cC]at case won't matter

1. ^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$
2. ^\d{3}-\d{3}-\d{4}$
3.^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9\\-\\.]+)\\.([a-zA-Z]{2,5})$
4. Unsure

1. Match the URLs (there should be three results).

POSSIBLE SOLUTION: (http)s?://

2. Match the phone numbers (three results).

POSSIBLE SOLUTION: [(]?[0-9]+[)]?[-]?[0-9]+[-][0-9]+

3. Match the e-mail addresses (two results).

POSSIBLE SOLUTION: [a-z]+@[a-z]+.[a-z]+.?[a-z]+

4. Match acronyms (there should be two results, with or without dots: CA and U.S.A.).

POSSIBLE SOLUTION: [A-Z]\.?[A-Z]\.?[A-Z]?\.?\s