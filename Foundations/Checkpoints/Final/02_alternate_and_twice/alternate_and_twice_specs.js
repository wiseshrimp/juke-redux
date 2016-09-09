describe("alternate", function() {
  var message;
  beforeEach(function(){
     message = "";
  });

  it("should return a function object", function(){
    var funcReturned = alternate(function(){
      message += "hey";
    });
    expect(typeof funcReturned === "function").toEqual(true);
  });

  it("should add 'hey' to message on alternate function calls", function() {
    var sayHeyOnAlternateCalls = alternate(function() {
      message += "hey";
    });
    sayHeyOnAlternateCalls();
    expect(message).toEqual("hey");
    sayHeyOnAlternateCalls();
    expect(message).toEqual("hey");
    sayHeyOnAlternateCalls();
    expect(message).toEqual("heyhey");
    sayHeyOnAlternateCalls();
    expect(message).toEqual("heyhey");
  });

});

describe("twice", function() {

  it("should return a function object", function(){
    var funcReturned = twice(function(){
      return "I'm happy I completed Foundations!";
    });
    expect(typeof funcReturned === "function").toEqual(true);
  });


  it("calls the function argument a maximum of two times", function(){
    var returnTen = jasmine.createSpy('returnTen', function(){
      return 10;
    });

    var returnVal = twice(returnTen);

    returnVal();
    returnVal();
    returnVal();

    expect(returnTen.calls.count()).toEqual(2);
  });


  it("returns the number value 10 when called", function() {
    var returnTen = twice(function(){
      return 10;
    });
    
    expect(returnTen()).toEqual(10);    
  });



  it("can be called twice", function(){
    var total = 0;
    var returnTen = twice(function(){
      return 10;
    });
    total += returnTen();
    total += returnTen();    
    expect(total).toEqual(20);    
  });

  it('returns 0 if called more than 2 times', function(){
    var total = 0,
        returnTen = twice(function(){
      return 10;
    }),
    calledMoreThanTwoTimes;
    
    total += returnTen();
    total += returnTen();
    total += returnTen();
    total += returnTen();  
    calledMoreThanTwoTimes = returnTen();  
    
    expect(total).toEqual(20);    
    expect(calledMoreThanTwoTimes).toEqual(0);
  });

  it("works on functions that return a random number (instead of just 10) ", function(){
    var randomNumber = Math.floor(Math.random()*1000)+1,
        total = 0,
        calledMoreThanTwoTimes;

    var returnRandomNum = twice(function(){
      return randomNumber;
    });

    total+=returnRandomNum();
    total+=returnRandomNum();
    total+=returnRandomNum();
    total+=returnRandomNum();
    calledMoreThanTwoTimes = returnRandomNum();

    expect(total).toEqual(randomNumber*2);
    expect(calledMoreThanTwoTimes).toEqual(0);
  });
});