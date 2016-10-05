var chai = require('chai');
var expect = chai.expect;
var models = require('../models');
var Student = models.Student;


describe('Student Model', function () {

    beforeEach('Sync tables', function (done) {
        Student.sync({force: true})
            .then(function () {
                done();
            })
            .catch(done);
    });

    beforeEach('Add some students', function (done) {

        Student.bulkCreate([
            {name: 'Katie Beuchner', cohort: '1606', campus: 'Grace Hopper Academy'},
            {name: 'Milad Nazeri', cohort: '1607', campus: 'Fullstack Academy'},
            {name: 'Karen MacPherson', cohort: '1507', campus: 'Fullstack Academy'},
            {name: 'Stephanie Harris', cohort: '1607', campus: 'Fullstack Academy'},
            {name: 'Yi Chao', cohort: '1607', campus: 'Fullstack Academy Chicago'}
        ])
            .then(function () {
                done();
            })
            .catch(done);

    });

    it('should exist', function () {
        expect(Student).to.be.an('object');
    });

    describe('findByCampus', function () {

        it('should exist', function () {
            expect(Student.findByCampus).to.be.a('function');
        });

        it('should find all students at a particular campus', function (done) {

            Student.findByCampus('Fullstack Academy')
                .then(function (students) {

                    expect(students.length).to.be.equal(3);

                    var campuses = students.map(function (s) {
                        return s.campus;
                    });

                    expect(campuses).to.be.deep.equal([
                        'Fullstack Academy',
                        'Fullstack Academy',
                        'Fullstack Academy'
                    ]);

                    done();

                })
                .catch(done)

        });

        it('should find all students on Grace Hopper', function (done) {
            Student.findByCampus('Grace Hopper Academy')
                .then(function (students) {
                    expect(students.length).to.be.equal(1);
                    expect(students[0].name).to.be.equal('Katie Beuchner');
                    done();
                })
                .catch(done);
        });

    });

    describe('findClassmates', function () {

        var milad;
        beforeEach(function (done) {
            Student.findOne({
                where: {
                    name: 'Milad Nazeri'
                }
            })
                .then(function (student) {
                    milad = student;
                    done();
                })
                .catch(done);
        });

        it('should find all other people in same campus and cohort', function (done) {
            milad.getClassmates()
                .then(function (classmates) {
                    expect(classmates.length).to.be.equal(1);
                    expect(classmates[0].name).to.be.equal('Stephanie Harris');
                    done();
                })
                .catch(done);
        });

    });

});