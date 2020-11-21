# Map component

## Table of contents
  - [What it does](#what-it-does)
  - [How to use](#how-to-use)
  - [Dependencies](#dependencies)
  - [Developer](#developer)
  - [Changelog](#changelog)

## What it does 
* Generate a map chart

## How to use
Import and implement component
```js
import Map from '../components/mapchart/Map'

<Map
  id='id'
  title='Title'
  primarySet='https://example.com/dataset.json'
  secondarySet='https://example.com/dataset.json' //optional
  mapData='https://example.com/map.json'
  filterOptions={['option1', 'option2']} //optional
/>
```

## Dependencies
* D3 ^6.2.0

## Developer
[Shabier](https://www.github.com/sjagoori)

## Changelog
### 1.1
* Added all attributes to the component caller
* Component now works without optional attributes

### 1.0
* Inital component creation