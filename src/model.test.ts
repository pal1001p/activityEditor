import {expect,test} from 'vitest'
import {Model,Reporter,Activity} from './model'

test('Model', ()=>{
    let m = new Model()
    expect(m.activities).toBe([])
    expect(m.reporters).toBe([])
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

// for copy pasting
test('', ()=>{
    
})