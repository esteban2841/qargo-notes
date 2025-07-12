import React from 'react'
import { TaskList } from '../tasks/organisms/TaskList'

export const MainScreen = () => {
  return (
    <div className="relative flex justify-center w-full items-center max-w-[1200px] h-full">
      <TaskList/>
    </div>
  )
}

