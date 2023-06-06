import { useDispatch } from 'react-redux';
import { deleteGoal } from '../features/goals/goalSlice.js';
import {FiEdit} from 'react-icons/fi'
import {RiCloseCircleLine} from 'react-icons/ri';

function GoalItem({ goal }) {
  const dispatch = useDispatch()

  return (
    <div className='goal'>
      <h2>{goal.text}</h2>
      <div className='time'>{new Date(goal.createdAt).toLocaleString('en-US')}</div>
      <button onClick={() => dispatch(deleteGoal(goal._id))} className='close'>
        <RiCloseCircleLine />
      </button>
      <button className='edit'>< FiEdit/></button>
    </div>
  )
}

export default GoalItem;
