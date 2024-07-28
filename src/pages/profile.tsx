import TeacherForm from "@/components/profile/teacher-form";
import WorkTimeTable from "@/components/profile/work-time-table";

export default function Profile() {
  return (
    <div className="container flex items-start gap-6">
      <TeacherForm />
      <WorkTimeTable />
    </div>
  );
}
