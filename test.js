// 09/25
// 김서방 찾기
// const solution = seoul =>
//     "김서방은 " + seoul.indexOf("Kim") + "에 있다";

// // 점의 위치 구하기
// const solution2 = dot =>
//     (dot[0] > 0 ? (dot[1] > 0 ? 1 : 4) : (dot[1] > 0 ? 2 : 3));


// 조건은 총 4가지이므로
// => if-else 2중첩으로 분리 가능

// 1. a가 양수일 때(a > 0) => (1 or 4)
//    A. b 가 양수이면(b > 0) => 1
//    B. b 가 음수이면(b < 0) => 4

// 2. a가 음수일 때(a < 0) => (2 or 3)
//    C. b 가 양수이면(b > 0) => 2
//    D. b 가 음수이면(b < 0) => 3

// 

// 09/26
// 두 수의 연산값 비교하기
// const solution = (a, b) =>
//     +("" + a + b) > 2 * a * b ? +("" + a + b) : 2 * a * b;

// // 원소들의 곱과 합
// const solution2 = num_list =>
//     num_list.reduce((acc, num) => acc * num) < Math.pow(num_list.reduce((acc, num) => acc + num), 2) ? 1 : 0;

// 09/27
// 둘만의 암호
// 알파벳 소문자의 유니코드는 97부터 122 까지
const solution = (str, exStr, num) => {
    const exCodes = exStr.split("").map(e => e.charCodeAt(0));
    return (str.split("")
        .map(char => {
            let code = char.charCodeAt(0);
            for (let steps = 0; steps < num;) {
                code = code === 122 ? 97 : code + 1; // z를 넘어가면 a로
                if (!exCodes.includes(code)) steps++; // 제외할 문자가 아니면 steps 증가
            }
            return String.fromCharCode(code);
        })
        .join(""));
};

// 글자 이어 붙여 문자열 만들기
const solution2 = (my_string, index_list) =>
    index_list.map(i => my_string[i]).join("");