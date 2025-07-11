import { TaskList } from "../components/tasks/organisms/TaskList";

export default async function MainPage() {
  return (
    <div className="relative flex justify-center w-full items-center max-w-[1200px] h-full">
      <TaskList />
    </div>
  );
}
