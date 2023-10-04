import React, { useRef, useState } from "react";
import { Input, Button, Alert } from "antd";
import { Job } from "../entities/Job";
const Todo_Form: React.FC = () => {
  const [showError, setShowError] = useState(false);
  const [job, setJob] = useState<any>("");
  const inputRef: any = useRef(); // Tạo tham chiếu trong DOM
  const [jobs, setJobs] = useState(() => {
    // useState với callback function thì nó sẽ lấy giá trị được return bên trong callback func đó làm giá trị khởi tạo
    const jobLocal = JSON.parse(localStorage.getItem("jobs") || "[]");
    return jobLocal;
  });
  // Validate Dữ Liệu
  const validateDate = (name: string, value: string) => {
    if (name === "job") {
      if (!value) {
        setShowError(true);
      } else {
        setShowError(false);
      }
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    // Gọi hàm validate
    validateDate(name, value);
    // Cập nhật lại state của job
    setJob({ ...job, [name]: value });
  };
  // Hàm submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Đối tượng newJob
    const newJob: Job = {
      id: Math.ceil(Math.random() * 1000),
      name: job.job,
      status: false,
    };
    // Cập nhật lại state(mảng công việc)
    if (!job.job) {
      setShowError(true);
    } else {
      setJobs([...jobs, newJob]);
      setJob("");
      // Gửi dữ liệu lên local
      localStorage.setItem("jobs", JSON.stringify([...jobs, newJob]));
      inputRef.current.focus();
    }
  };

  const handleDelete = (job: Job) => {
    setShowError(false);
    const filterJob = jobs.filter((j: Job) => j.id !== job.id);
    setJobs(filterJob);
    localStorage.setItem("jobs", JSON.stringify(filterJob));
  };

  const handleUpdate = (job: Job) => {
    setShowError(false);
    const findIndex = jobs.findIndex((j: Job) => j.id == job.id);
    jobs[findIndex].status = !jobs[findIndex].status;
    const newList = [...jobs];
    setJobs(newList);
    localStorage.setItem("jobs", JSON.stringify(newList));
  };

  return (
    <div>
      <h3 className="text-2xl font-bold text-center">Danh sách công việc</h3>
      <form className="flex gap-1 mb-2" onSubmit={handleSubmit}>
        <Input
          ref={inputRef}
          placeholder="Nhập công việc... "
          name="job"
          onChange={handleChange}
          value={job.job}
        />
        <Button type="primary" htmlType="submit" className="bg-blue-600">
          Thêm
        </Button>
      </form>
      {showError ? (
        <Alert
          type="error"
          showIcon
          message="Tên công việc không được để trống"
          className="mb-2"
        />
      ) : (
        <></>
      )}
      {jobs.length > 0 ? (
        jobs.map((job: Job) => (
          <div className="border shadow mb-2" key={job.id}>
            <div className="flex justify-between items-center p-1">
              <div className="flex items-center gap-2">
                <input
                  checked={job.status}
                  type="checkbox"
                  className="h-7"
                  onClick={() => handleUpdate(job)}
                ></input>
                {job.status ? <s>{job.name}</s> : <span>{job.name}</span>}
              </div>
              <Button danger onClick={() => handleDelete(job)}>
                Xoá
              </Button>
            </div>
          </div>
        ))
      ) : (
        <>
          <div className="border shadow mb-2 p-1">
            <div className="flex justify-center items-center p-3">
              <h3>Chưa có công việc</h3>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Todo_Form;
