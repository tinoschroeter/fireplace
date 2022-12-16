var checkInclusion = function(s1, s2) {

    if(s1.length < s2.length) return false;

    const map = {};

    let start = 0;
    let end = s1.length -1;

    while(end < s2.length) {

        const val = s2.slice(start, end + 1);
        map[val] = true;

        start++
        end++
    }

    console.log(map);
};

checkInclusion("ab", "eidbaooo")
