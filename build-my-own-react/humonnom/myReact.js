const React = (function () {
  let states = [];
  let setters = [];
  let renderId = -1;
  let cursor = 0;

  function createSetter(cursor, renewVal) {
    if (renewVal) return (arg) => { states[cursor] = renewVal(states[cursor], arg)}
    else return (newVal) => { states[cursor] = newVal };
  }

  const handleFirstRender = (initVal, renewVal) => {
    if (isFirstRender()){
      const setter = renewVal ? createSetter(cursor, renewVal) : createSetter(cursor)
      states.push(initVal);
      setters.push(setter);
    }
  }
  
  function useReducer(renewVal, initVal) {
    handleFirstRender(initVal, renewVal);
    const [value, setter] = getStateAndSetter();
    handleCursor();
    return [value, setter];
  }
  
  function useState(initVal) {
    handleFirstRender(initVal);
    const [value, setter] = getStateAndSetter();
    handleCursor();
    return [value, setter];
  }

  // create reactDom Object
  function createElement(...args) {
    const [ type, props, ...children ] = args;
   
    return {
      type,
      props:{
        ...props,
        children
      }
    }
  }


  const increaseRenderId = () => { renderId++ }
  const initCursor = () => { cursor = 0 }
  const incCursor = () => { cursor++ }
  const handleCursor = () => { incCursor() };
  const isFirstRender = () => renderId === 0;
  const getStateAndSetter = () => [states[cursor], setters[cursor]]

  return { useState, useReducer, createElement, increaseRenderId, initCursor };
})();

export default React;

/*
render는 ReactDOM이 담당함
  // render Actual DOM using React DOM(object)
  function render() {
    //console.log("render");
  }
*/