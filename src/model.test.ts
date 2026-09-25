import {expect,test} from 'vitest'
import {Model,Reporter,Activity} from './model'

test('Model', ()=>{
    let m = new Model()
    expect(m.activities).toStrictEqual([])
    expect(m.reporters).toStrictEqual([])
})

test('Reporter', ()=>{
    let r = new Reporter('Sammy Smith')
    expect(r.name).toBe('Sammy Smith')
})

test('Activity', ()=>{
    let a = new Activity('News', 'Find some news')
    expect(a.actName).toBe('News')
    expect(a.description).toBe('Find some news')
})

test('Add Activity', ()=>{
    let m = new Model
    let a = new Activity('News', 'Find some news')
    m.addActivity(a)
    expect(m.activities[0].actName).toBe('News')
    expect(m.activities[0].description).toBe('Find some news')
})

test('Add Reporter', ()=>{
    let m = new Model
    let r = new Reporter('Sammy Smith')
    m.addReporter(r)
    expect(m.reporters[0].name).toBe('Sammy Smith')
})

test('Promote Activity when no assigned reporters', ()=>{
    let m = new Model
    let a2 = new Activity('News', 'Find some news')
    let a = new Activity('Relax', 'Just relax')
    m.addActivity(a)
    m.addActivity(a2)

    m.promoteActivity(a2)
    expect(m.activities[0].actName).toBe('News')
    expect(m.activities[0].description).toBe('Find some news')
})

// for copy pasting
test('', ()=>{
    
})