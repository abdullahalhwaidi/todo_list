import './Task.css'
import classNames from 'classnames';
// import { useStore } from 'zustand';
import { useStore } from '../store';
import { FaTrash } from 'react-icons/fa';


export default function Task ({ title }) { 
  const task = useStore((store) => 
    store.tasks.find((task) => task.title === title)
  );
  
  const setDraggedTask = useStore(store=>store.setDraggedTask);
  const deleteTask = useStore((store) => store.deleteTask);

  return (
    <div 
      className='task' 
      draggable 
      onDragStart={() => {
        setDraggedTask(task.title);
      }}
    >  
      <div>{task.title }</div>
      <div className='bottomWrapper'>
        <div>
          <FaTrash size={17} color="black" onClick={()=> deleteTask(task.title)}/>
        </div>
        <div className={classNames('status', task.state)}> { task.state } </div>
      </div>
    </div>
  );
}