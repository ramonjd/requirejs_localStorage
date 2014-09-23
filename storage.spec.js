define([

    'storage'

], function (core) {
    'use strict';

    describe('Storage Service Test', function () {

        var service,
            testKey = 'test',
            obj = {
                'one': 1,
                'two': 2
            },
            returnedObj;

        service = storage;


        describe('Local Storage - ', function () {

            it('should have a service and api', function () {
                expect(service).not.toEqual(null);
                expect(service.local).not.toEqual(null);
                expect(service.local.set).not.toEqual(null);
                expect(service.local.get).not.toEqual(null);
                expect(service.local.remove).not.toEqual(null);
            });

            it('should not save anything if values are not passed', function () {
                service.local.set(testKey);
                returnedObj = service.local.get(testKey);
                expect(returnedObj).toEqual(null);
            });

            it('should add string to local storage, convert numbers to strings, and set correct values', function () {
                service.local.set('name', 'Tony');
                service.local.set('age', 12);
                expect(window.localStorage.name).toBeDefined();
                expect(window.localStorage.age).toBeDefined();

                expect(window.localStorage.name).toEqual('Tony');
                expect(window.localStorage.age).toEqual('12');
            });

            it('should add an object to local storage and set correct values', function () {
                service.local.set(testKey, obj);
                expect(window.localStorage[testKey]).toBeDefined();
                returnedObj = core.utils.parseJSON(window.localStorage[testKey]);
                expect(returnedObj.one).toEqual(1);
                expect(returnedObj.two).toEqual(2);
            });

            it('should return correct values from local storage', function () {
                returnedObj = service.local.get(testKey);
                expect(returnedObj.one).toEqual(1);
                expect(returnedObj.two).toEqual(2);
            });

            it('should remove an object from local storage', function () {
                service.local.remove(testKey);
                returnedObj = service.local.get(testKey);
                expect(returnedObj).toEqual(null);
                expect(window.localStorage[testKey]).not.toBeDefined();
            });
        });

        describe('Session Storage - ', function () {
            it('should have a service and api', function () {

                expect(service).not.toEqual(null);

                expect(service.session).not.toEqual(null);
                expect(service.session.set).not.toEqual(null);
                expect(service.session.get).not.toEqual(null);
                expect(service.session.remove).not.toEqual(null);
            });


            it('should not save anything if values are not passed', function () {
                service.session.set(testKey);
                returnedObj = service.session.get(testKey);
                expect(returnedObj).toEqual(null);
            });

            it('should add string to session storage, convert numbers to strings, and set correct values', function () {
                service.session.set('name', 'Sergio');
                service.session.set('age', 55);
                expect(window.sessionStorage.name).toBeDefined();
                expect(window.sessionStorage.age).toBeDefined();

                expect(window.sessionStorage.name).toEqual('Sergio');
                expect(window.sessionStorage.age).toEqual('55');
            });

            it('should add an object to session storage and set correct values', function () {
                service.session.set(testKey, obj);
                expect(window.sessionStorage[testKey]).toBeDefined();
                returnedObj = core.utils.parseJSON(window.sessionStorage[testKey]);
                expect(returnedObj.one).toEqual(1);
                expect(returnedObj.two).toEqual(2);
            });


            it('should return correct values from session storage', function () {
                returnedObj = service.session.get(testKey);
                expect(returnedObj.one).toEqual(1);
                expect(returnedObj.two).toEqual(2);
            });

            it('should remove an object from session storage', function () {
                service.session.remove(testKey);
                returnedObj = service.session.get(testKey);
                expect(returnedObj).toEqual(null);
                expect(window.sessionStorage[testKey]).not.toBeDefined();
            });
        });

    });
});