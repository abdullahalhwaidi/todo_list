// import './Column.css'
// import Task from "./Task";
// //import { useStore } from 'zustand';
// import { useStore } from '../store';
// import { useState } from 'react';
// import classNames from 'classnames';

// export default function Column({ state }) {
//   const [text, setText] = useState('');
//   const [open, setOpen] = useState(false);
//   const [drop, setDrop] = useState(false);
  
//   const tasks = useStore((store) => 
//     store.tasks.filter((task) => task.state === state)
//   );
  
//   const addTask = useStore((store) => store.addTask);
//   const setDraggedTask = useStore((store) => store.setDraggedTask);
//   const draggedTask = useStore((store) => store.draggedTask);
//   const moveTask = useStore((store) => store.moveTask);
  

//   return (
//     <div 
//       className={classNames('column', {drop: drop})}
//       onDragOver={(e) => {
//         setDrop(true);
//         e.preventDefault();
//       }}
//       onDragLeave={(e) => {
//         setDrop(false);
//         e.preventDefault();
//       }}
//       onDrop={(e)=> {
//         setDrop(false);
//         moveTask(draggedTask, state);
//         console.log('drop')
//       }}
//     >
//       <div className='titleWrapper'>
//         <p>{ state }</p>
//         <button onClick={() => setOpen(true)}>Add</button>
//       </div>
      

//       {tasks.map((task) => (
//         <Task title={task.title} key={task.title} />
//       ))}

      
//       {open && (
//         <div className='Modal'>
//           <div className='modalContent'>
//             <input onChange={(e) => setText(e.target.value)} value={text} />
//             <button
//               onClick={() => {
//                 addTask(text, state);
//                 setText('');
//                 setOpen(false);
//                 setDraggedTask('');
//               }}
//             >
//               Submit
//             </button> 
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// import './Column.css'
// import Task from "./Task";
// //import { useStore } from 'zustand';
// import { useStore } from '../store';
// import { useState } from 'react';
// import classNames from 'classnames';

// export default function Column({ state }) {
//   const [text, setText] = useState('');
//   const [open, setOpen] = useState(false);
//   const [drop, setDrop] = useState(false);

//   const tasks = useStore((store) => 
//     store.tasks.filter((task) => task.state === state)
//   );

//   const addTask = useStore((store) => store.addTask);
//   const setDraggedTask = useStore((store) => store.setDraggedTask);
//   const draggedTask = useStore((store) => store.draggedTask);
//   const moveTask = useStore((store) => store.moveTask);

//   // دالة التعامل مع إضافة المهمة
//   const handleSubmit = () => {
//     if (text.trim() !== '') {
//       addTask(text, state);
//       setText('');
//       setOpen(false);
//       setDraggedTask('');
//     }
//   };

//   return (
//     <div 
//       className={classNames('column', { drop: drop })}
//       onDragOver={(e) => {
//         setDrop(true);
//         e.preventDefault();
//       }}
//       onDragLeave={(e) => {
//         setDrop(false);
//         e.preventDefault();
//       }}
//       onDrop={(e) => {
//         setDrop(false);
//         moveTask(draggedTask, state);
//         console.log('drop');
//       }}
//     >
//       <div className='titleWrapper'>
//         <p>{ state }</p>
//         <button onClick={() => setOpen(true)}>Add</button>
//       </div>

//       {tasks.map((task) => (
//         <Task title={task.title} key={task.title} />
//       ))}

//       {open && (
//         <div className='Modal'>
//           <div className='modalContent'>
//             {/* إدخال المهمة */}
//             <input
//               onChange={(e) => setText(e.target.value)}
//               value={text}
//               onKeyDown={(e) => {
//                 if (e.key === 'Enter') {
//                   handleSubmit(); // تنفيذ إضافة المهمة عند الضغط على Enter
//                 }
//               }}
//             />
//             {/* زر الإرسال */}
//             <button onClick={handleSubmit}>
//               Submit
//             </button> 
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import './Column.css';
import Task from "./Task";
//import { useStore } from 'zustand';
import { useStore } from '../store';
import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';

export default function Column({ state }) {
  const [text, setText] = useState('');
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);

  const inputRef = useRef(null); // مرجع لحقل الإدخال

  const tasks = useStore((store) => 
    store.tasks.filter((task) => task.state === state)
  );

  const addTask = useStore((store) => store.addTask);
  const setDraggedTask = useStore((store) => store.setDraggedTask);
  const draggedTask = useStore((store) => store.draggedTask);
  const moveTask = useStore((store) => store.moveTask);

  // دالة التعامل مع إضافة المهمة
  const handleSubmit = () => {
    if (text.trim() !== '') {
      addTask(text, state);
      setText('');
      setOpen(false);
      setDraggedTask('');
    }
  };

  // تركيز تلقائي على حقل الإدخال عند فتح الـ Modal
  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  return (
    <div 
      className={classNames('column', { drop: drop })}
      onDragOver={(e) => {
        setDrop(true);
        e.preventDefault();
      }}
      onDragLeave={(e) => {
        setDrop(false);
        e.preventDefault();
      }}
      onDrop={(e) => {
        setDrop(false);
        moveTask(draggedTask, state);
        console.log('drop');
      }}
    >
      <div className='titleWrapper'>
        <p>{ state }</p>
        <button
          onClick={() => {
            setOpen(true);
          }}
        >
          Add
        </button>
      </div>

      {tasks.map((task) => (
        <Task title={task.title} key={task.title} />
      ))}

      {open && (
        <div className='Modal'>
          <div className='modalContent'>
            {/* إدخال المهمة */}
            <input
              ref={inputRef} // ربط حقل الإدخال بالمرجع
              onChange={(e) => setText(e.target.value)}
              value={text}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSubmit(); // تنفيذ إضافة المهمة عند الضغط على Enter
                }
              }}
            />
            {/* زر الإرسال */}
            <button onClick={handleSubmit}>
              Submit
            </button> 
          </div>
        </div>
      )}
    </div>
  );
}
