// import React from 'react';
// import { useState } from 'react';

// import Select from 'react-select';
// import makeAnimated from 'react-select/animated';
// // import { colourOptions } from './docs/data';

// const animatedComponents = makeAnimated();
// const options = [
//     { value: 'chocolate', label: 'Chocolate' },
//     { value: 'strawberry', label: 'Strawberry' },
//     { value: 'vanilla', label: 'Vanilla' }
//   ]

// export default function AnimatedMulti() {
//     const [selected, setSelected] = useState([]);
    
//   return (
//     <>
//        <pre>{(selected.map(e=>(e.value)))}</pre>
//     <Select
//       closeMenuOnSelect={false}
//       components={animatedComponents}
//       isMulti
//       options={options}
//       value={selected}
//      onChange={setSelected}
//      className='caret-transparent border-transparent ring-transparent border-red-300'
//     />
//     </>
//   );
// }


import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";
// import "./styles.css";

export default function MultiSelectio() {
  const options = [
    { label: "Grapes ", value: "grapes" },
    { label: "Mango ", value: "mango" },
    { label: "Strawberry ", value: "strawberry" },
    { label: "Watermelon ", value: "watermelon" },
    { label: "Pear ", value: "pear", disabled: true },
    { label: "Apple ", value: "apple" },
    { label: "Tangerine ", value: "tangerine" },
    { label: "Pineapple ", value: "pineapple" },
    { label: "Peach ", value: "peach" }


    // { value: 'X', label: 'X' },
    // { value: 'M', label: 'M' },
    // { value: 'L', label: 'L' },
    // { value: 'L', label: 'S' },
    // { value: 'L', label: 'XL'},
    // { value: 'L', label: 'XXL'},
    // { value: 'L', label: 'SL'},
    // { value: 'L', label: 'ML'}
  ];

  const [selected, setSelected] = useState([]);

  return (
    <div>
      <h1>Select Fruits</h1>
      <pre>{JSON.stringify(selected)}</pre>
      <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy={"Select"}
        isCreatable={true}
      />
    </div>
  );
}
