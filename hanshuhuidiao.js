function funcA(func) {
    func()
    console.log(func);
    func();
}

function funcB() {
    console.log('ar you!')
}
funcA(funcB);
//函数回调