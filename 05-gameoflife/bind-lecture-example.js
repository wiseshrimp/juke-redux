

/*

    The ways that "this" gets set:

    1. .call/.apply / x.call(person)
    2. Invoking with the dot operator
    3. new fn() -- this is newly created instance
    4. .bind / Function.prototype.bind

 */

var person = {
    name: 'Joe',
    sayName: function () {
        console.log(this.name);
    }
};

var photos = document.getElementsByClassName('photos');

[].slice.call(photos).forEach(function (photoEl) {
    photoEl.addEventListener('click', person.sayName.bind(person));
});

setInterval(person.sayName.bind(person), 200);









