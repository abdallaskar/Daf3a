import { IoIosArrowDropdown } from "react-icons/io";
import MentorCard from "./MentorCard";
const mentors = [
  {
    id: 1,
    name: "Sarah Chen",
    title: "Product Manager",
    company: "TechCorp",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBZe58f_0mZFp2wqOH2IJMtG8BOgROp_Tk6IS0MWlxt-AUNdYPuEKqJ4mSWPmJGhilE6qplJDQRh7Z8nP-nlC7D4z8vmXvyUhHtW15l1Q59n5mi23SJtWLUcrh65A806cxECMiFfe8sX7nzPW9NsQsgHE3gGEJ09krD1eM7SByz1vuX_qbOj6DLfqMpIL75k-zU2NEDRGwhpmIrm0j2pGWdMGUqxO-FgJyrEMKr-ipV20sHYXJF8_jHRQbsAjvktfHeU7t_oCH1GZ8",
    verified: true,
    rating: "4.9",
    reviewCount: 120,
    hourlyRate: 50,
    skills: ["Product", "UX"],
  },
  {
    id: 2,
    name: "David Lee",
    title: "Software Engineer",
    company: "Innovate",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDlJgoAoL3Hse1hVQuyPxYxBEvwQUMP3z9f2uQeD2CGHebwiKVy5qDlv2Ptma-qbXG6tOuF-BmSmldGzhgHQU_xzrt0uLugzWHW_Dy4HTgNmSnxR-5eh1IUwIsigRK27dKglnlUbyoVmYYc37dEAN0M7-WaU_cN9yT74tifNaKjEMu8ATyp5Ql-QoH0ltuxARtCPYV89b8afGsR00q8eZPYciwtgvqixrqlvkDNhJ1O1DfPQwy3AU8zfbsnQ5Lcg5CgkGb8Q5ck4yg",
    verified: true,
    rating: "5.0",
    reviewCount: 98,
    hourlyRate: 75,
    skills: ["Frontend", "React"],
  },
  {
    id: 3,
    name: "Emily Carter",
    title: "Marketing Director",
    company: "Global",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBcehDgc-v_GPglnx1RybXF3lDAcgkOKqo1tQ8oD-v5D9Qq7l1m540qt1mAWL9BQNsnq6Jl6P7d8mtX-eb4LaiWueeb5a3BZRWmXaRdwBT0hm4ORM6Qhwys90G6_9h6MQDrhH70P70IKi8QCJP4sekxQnbfM7ncDx5CmQXVvL28XWo27VCONIsoyNOhlr9aypZdvFkDphjz_v3c7DH0eGEbHWjazJV_Z0o1orQmWn4ez7Fr9htx3JaEvERWSkXcdrr4AkokkuBmBA0",
    verified: true,
    rating: "4.8",
    reviewCount: 75,
    hourlyRate: 60,
    skills: ["Marketing", "SEO"],
  },
  {
    id: 4,
    name: "Michael Brown",
    title: "Data Scientist",
    company: "Analytics Inc.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBr4uafhSY9JWXyMojBFg4h8jo2UsnL1vWiHKYrKx8iShqhrLvF3KRfEmM1yjZ5WwlefViJep1wQKkNC43blbsZAstlbcdE7o_7M2KbKxh-03VpayYGRZThsbLYpO-ZxryqJ0A8Aeq5a6z7KMcJUEQwOwvAW9HUxJuZz0jAahthDEmp2SiVPu-l9tEXCLaxY4Y4gDEX9fCwXs9tiI8OKUelq9b0txcA4s11wo_rTqKRbi7oOTR-ZAAWjKdRvuWKjIpwtMgtX8Luh7E",
    verified: true,
    rating: "4.9",
    reviewCount: 150,
    hourlyRate: 90,
    skills: ["Python", "ML"],
  },
];

function FindAllMentors() {
  return (
    <>
      <div className="flex flex-wrap gap-3">
        {[
          "Skills",
          "Industry",
          "Price Range",
          "Mentor Rating",
          "More Filters",
        ].map((filter) => (
          <button
            key={filter}
            className="flex items-center gap-2 bg-surface border border-default rounded-full px-4 py-2 text-sm font-medium text-secondary hover-surface transition-theme"
          >
            {filter}
            <IoIosArrowDropdown size={20} />
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {mentors.map((mentor) => (
          <MentorCard key={mentor.id} mentor={mentor} />
        ))}
      </div>
    </>
  );
}

export default FindAllMentors;
