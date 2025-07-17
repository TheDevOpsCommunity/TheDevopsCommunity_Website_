"use client";
import { FaDatabase, FaChartBar, FaPython } from "react-icons/fa";
import { SiPandas } from "react-icons/si";
import { VscAzure ,} from "react-icons/vsc";
// import { RiFileExcel2Line } from "react-icons/ri";
import { MdOutlineDescription, MdAnalytics, MdSecurity } from "react-icons/md";
import { BsFillPersonLinesFill, BsGearFill } from "react-icons/bs";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { motion } from "motion/react";
import { useState } from "react";

const modules = [
  {
    title: "SQL Fundamentals & Database Design",
    topics: [
      {
        icon: <FaDatabase className="text-blue-500" size={28} />,
        title: "Basic SQL Syntax",
        desc: "Understanding basic SQL commands like SELECT, INSERT, UPDATE, DELETE. Familiarity with clauses such as WHERE, ORDER BY, GROUP BY, HAVING.",
      },
      {
        icon: <FaDatabase className="text-green-500" size={28} />,
        title: "Database Design & Normalization",
        desc: "Knowledge of database design principles. Understanding of normalization forms (1NF, 2NF, 3NF).",
      },
      {
        icon: <FaDatabase className="text-purple-500" size={28} />,
        title: "Joins & Advanced Queries",
        desc: "Different types of joins: INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL JOIN. Ability to write queries using joins to combine data from multiple tables.",
      },
      {
        icon: <FaDatabase className="text-red-500" size={28} />,
        title: "Subqueries & Aggregate Functions",
        desc: "Use of subqueries within SELECT, FROM, WHERE clauses. Understanding of correlated subqueries. Knowledge of aggregate functions like COUNT, SUM, AVG, MAX, MIN.",
      },
    ],
  },
  {
    title: "Advanced SQL Concepts",
    topics: [
      {
        icon: <MdOutlineDescription className="text-blue-600" size={28} />,
        title: "Views & Stored Procedures",
        desc: "Definition and use of views. Creating and modifying views. Creating and using stored procedures and functions.",
      },
      {
        icon: <MdSecurity className="text-red-600" size={28} />,
        title: "Transactions & Security",
        desc: "Understanding of transactions and their properties (ACID). Use of BEGIN TRANSACTION, COMMIT, and ROLLBACK. Understanding of SQL injection prevention.",
      },
      {
        icon: <BsGearFill className="text-gray-600" size={28} />,
        title: "Constraints & Data Types",
        desc: "Knowledge of constraints like PRIMARY KEY, FOREIGN KEY, UNIQUE, NOT NULL. Familiarity with different data types and type conversion functions.",
      },
      {
        icon: <MdAnalytics className="text-green-600" size={28} />,
        title: "Analytical Functions & Triggers",
        desc: "Use of analytical functions like ROW_NUMBER(), RANK(), DENSE_RANK(). Definition and use of triggers (BEFORE and AFTER triggers).",
      },
    ],
  },
  {
    title: "Python for Data Analysis",
    topics: [
      {
        icon: <FaPython className="text-yellow-500" size={28} />,
        title: "Python Fundamentals",
        desc: "Understanding variables, data types (integers, floats, strings, lists, dictionaries, etc.). Familiarity with basic operations and control structures.",
      },
      {
        icon: <SiPandas className="text-blue-600" size={28} />,
        title: "Data Analysis Libraries",
        desc: "Proficiency in using key libraries like Pandas, NumPy, and Matplotlib/Seaborn for data manipulation, analysis, and visualization.",
      },
      {
        icon: <FaChartBar className="text-green-500" size={28} />,
        title: "Data Cleaning & Visualization",
        desc: "Handling missing values. Data imputation and transformation techniques. Creating meaningful visualizations and interpreting insights.",
      },
      {
        icon: <MdAnalytics className="text-purple-500" size={28} />,
        title: "Statistical Analysis & APIs",
        desc: "Basic statistical concepts (mean, median, mode, standard deviation). API integration using requests library. Working with time series data.",
      },
    ],
  },
  {
    title: "Power BI Mastery",
    topics: [
      {
        icon: <VscAzure className="text-yellow-600" size={28} />,
        title: "Data Loading & Transformation",
        desc: "Understanding how to connect to various data sources. Data transformation techniques using Power Query Editor.",
      },
      {
        icon: <MdOutlineDescription className="text-blue-600" size={28} />,
        title: "Data Modeling & DAX",
        desc: "Creating relationships between tables. Defining and using calculated columns and measures. Proficiency in writing DAX formulas.",
      },
      {
        icon: <FaChartBar className="text-green-600" size={28} />,
        title: "Visualizations & Interactivity",
        desc: "Creating effective and interactive visualizations using various chart types. Implementing filters, slicers, drill-down and drill-up functionalities.",
      },
      {
        icon: <MdSecurity className="text-red-600" size={28} />,
        title: "Advanced Features & Security",
        desc: "Row-Level Security (RLS) implementation. Power BI Service deployment. Gateways, Apps, DirectQuery vs Import mode, and performance optimization.",
      },
    ],
  },
  {
    title: "ETL Processes & Data Engineering",
    topics: [
      {
        icon: <BsGearFill className="text-blue-500" size={28} />,
        title: "Data Extraction & Transformation",
        desc: "Understanding various methods for extracting data from source systems. Cleaning and validating data to ensure accuracy. Applying business rules during transformation.",
      },
      {
        icon: <FaDatabase className="text-green-500" size={28} />,
        title: "Data Loading & Quality",
        desc: "Loading transformed data into target systems. Different loading techniques (full load, incremental load, CDC). Implementing data quality checks.",
      },
      {
        icon: <MdAnalytics className="text-purple-500" size={28} />,
        title: "ETL Architecture & Tools",
        desc: "Understanding ETL process architecture. Choosing between traditional ETL tools and modern ELT approaches. Proficiency in ETL tools like SSIS, Talend, Informatica.",
      },
      {
        icon: <MdOutlineDescription className="text-orange-500" size={28} />,
        title: "Advanced ETL Concepts",
        desc: "Slowly Changing Dimensions (SCD) handling. Metadata management, error handling, parallel processing, and data migration strategies.",
      },
    ],
  },
  {
    title: "Azure Data Platform",
    topics: [
      {
        icon: <VscAzure className="text-blue-600" size={28} />,
        title: "Introduction to Azure",
        desc: "What is Microsoft Azure? Key benefits of cloud computing. Azure use cases for data analytics. Azure Portal overview and navigation.",
      },
      {
        icon: <FaDatabase className="text-blue-500" size={28} />,
        title: "Azure SQL Database",
        desc: "What is Azure SQL Database? Differences between Azure SQL and On-Premises SQL Server. Use cases and pricing tiers (Basic, Standard, Premium).",
      },
      {
        icon: <BsGearFill className="text-green-500" size={28} />,
        title: "Azure SQL Setup & Configuration",
        desc: "Creating Resource Groups and Azure SQL Server. Creating SQL Database and configuring firewall rules. Setting admin login and password management.",
      },
      {
        icon: <MdOutlineDescription className="text-purple-500" size={28} />,
        title: "Connecting & Operations",
        desc: "Connecting using SSMS and Azure Data Studio. Connection strings for applications (Python, Power BI). Basic SQL operations and data import in Azure.",
      },
    ],
  },
  {
    title: "Practical Applications & Tools",
    topics: [
      {
        icon: <FaPython className="text-yellow-500" size={28} />,
        title: "Development Environment",
        desc: "Overview of Spyder IDE environment. SQL and Database interaction using SQLAlchemy. Connecting Python to databases for data analysis.",
      },
      {
        icon: <MdAnalytics className="text-green-600" size={28} />,
        title: "Business Intelligence Projects",
        desc: "End-to-end data analysis projects. Business case scenarios and real-world applications. Creating comprehensive BI dashboards.",
      },
    ],
  },
  {
    title: "Interview & Career Preparation",
    topics: [
      {
        icon: <BsFillPersonLinesFill className="text-blue-700" size={28} />,
        title: "Resume & Portfolio",
        desc: "Craft a data analyst-ready resume, build a strong portfolio with projects, optimize LinkedIn profile for data roles.",
      },
      {
        icon: <MdOutlineDescription className="text-pink-400" size={28} />,
        title: "Interview Preparation",
        desc: "Sample interview questions, technical assessments, business case scenarios, and job search strategies for data analyst positions.",
      },
    ],
  },
];

function CurriculumCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="relative border-2 border-blue-200 rounded-3xl p-2 bg-transparent overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="bg-white border border-blue-100 rounded-2xl p-6 flex flex-col gap-4 shadow-lg">
        {/* Lamp-like gradient accent at top left */}
        <div className="absolute top-0 left-8 h-0.5 w-16 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-full z-20" />
        <div className="absolute top-[-8px] left-6 w-24 h-6 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 opacity-30 blur-2xl rounded-full z-10" />
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shadow-md">
            {icon}
          </div>
          <div className="font-bold text-blue-900 text-lg ">{title}</div>
        </div>
        <div className="text-neutral-600 text-base leading-relaxed">{desc}</div>
      </div>
    </div>
  );
}

const CourseInquiryForm = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          type: 'course'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit inquiry');
      }

      setSubmitted(true);
      setForm({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit inquiry');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl shadow-lg text-center border border-blue-100">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-blue-900 mb-2">Thank You!</h3>
        <p className="text-blue-700">We&apos;ll get back to you soon with course details.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-1">
        <label htmlFor="name" className="block text-sm font-medium text-blue-900">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          placeholder="Your name"
          className="w-full px-4 py-2.5 rounded-xl border border-blue-200 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder:text-blue-200"
        />
      </div>
      <div className="space-y-1">
        <label htmlFor="email" className="block text-sm font-medium text-blue-900">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          placeholder="you@example.com"
          className="w-full px-4 py-2.5 rounded-xl border border-blue-200 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder:text-blue-200"
        />
      </div>
      <div className="space-y-1">
        <label htmlFor="phone" className="block text-sm font-medium text-blue-900">
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="+1 (555) 000-0000"
          className="w-full px-4 py-2.5 rounded-xl border border-blue-200 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder:text-blue-200"
        />
      </div>
      <div className="space-y-1">
        <label htmlFor="message" className="block text-sm font-medium text-blue-900">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={4}
          placeholder="Tell us about your learning goals..."
          className="w-full px-4 py-2.5 rounded-xl border border-blue-200 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder:text-blue-200 resize-none"
        />
      </div>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
          {error}
        </div>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Submitting...
          </span>
        ) : (
          'Submit Inquiry'
        )}
      </button>
    </form>
  );
};

const CompactCourseInquiryForm = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          type: 'course'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit inquiry');
      }

      setSubmitted(true);
      setForm({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit inquiry');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-white p-4 rounded-xl shadow text-center border border-blue-100">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-blue-900 mb-2">Thank You!</h3>
        <p className="text-blue-700 text-sm">We&apos;ll get back to you soon with course details.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <input
          type="text"
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          placeholder="Your name"
          className="w-full px-3 py-2 text-sm rounded-lg border border-blue-200 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder:text-gray-400"
        />
      </div>
      <div>
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          placeholder="you@example.com"
          className="w-full px-3 py-2 text-sm rounded-lg border border-blue-200 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder:text-gray-400"
        />
      </div>
      <div>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone number"
          className="w-full px-3 py-2 text-sm rounded-lg border border-blue-200 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder:text-gray-400"
        />
      </div>
      <div>
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={3}
          placeholder="Tell us about your learning goals..."
          className="w-full px-3 py-2 text-sm rounded-lg border border-blue-200 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder:text-gray-400 resize-none"
        />
      </div>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded-lg text-xs">
          {error}
        </div>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2.5 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow hover:shadow-lg text-sm"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Submitting...
          </span>
        ) : (
          'Submit Inquiry'
        )}
      </button>
    </form>
  );
};

export default function DataAnalystCoursePage() {
  const [showSubheading, setShowSubheading] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const headingWords = "Data Analyst";
  const subheadingWords = "Certification Course";
  const descriptionWords = "Master the complete data analysis workflow from SQL querying and Python programming to Power BI visualization and Azure cloud data platforms. Build real-world skills in data extraction, transformation, analysis, and business intelligence.";

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 text-neutral-800 py-10 px-4 pt-24 md:pt-28">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
          {/* Left side - Main Content */}
          <div className="lg:w-[65%]">
            {/* Header Section */}
            <div className="mb-8 md:mb-12 p-4 md:p-6 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-blue-100">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3 mb-1"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <FaChartBar className="text-green-600 w-10 h-10 md:w-12 md:h-12" />
                </motion.div>
                <div className="text-2xl md:text-3xl lg:text-5xl lg:leading-tight font-bold text-blue-900">
                  <TextGenerateEffect 
                    words={headingWords} 
                    onComplete={() => setShowSubheading(true)}
                  />
                </div>
              </motion.div>
              
              {showSubheading && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-lg md:text-xl lg:text-2xl lg:leading-tight mt-2 font-medium text-blue-700 pl-1"
                >
                  <TextGenerateEffect 
                    words={subheadingWords} 
                    onComplete={() => setShowDescription(true)}
                  />
                </motion.div>
              )}

              {showDescription && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-sm md:text-base lg:text-lg lg:leading-relaxed mt-3 text-neutral-600 pl-1"
                >
                  <TextGenerateEffect 
                    words={descriptionWords} 
                    onComplete={() => setShowContent(true)}
                  />
                </motion.div>
              )}
            </div>

            {/* Course Stats */}
            {showContent && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-8 md:mb-10 p-4 md:p-6 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-blue-100"
              >
                <h3 className="text-lg md:text-xl font-bold text-blue-900 mb-4">Course Overview</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-xl">
                    <div className="text-2xl font-bold text-blue-900">40+</div>
                    <div className="text-sm text-blue-600">Hours of Training</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-xl">
                    <div className="text-2xl font-bold text-green-900">5</div>
                    <div className="text-sm text-green-600">Core Technologies</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-xl">
                    <div className="text-2xl font-bold text-purple-900">10+</div>
                    <div className="text-sm text-purple-600">Hands-on Projects</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-xl">
                    <div className="text-2xl font-bold text-orange-900">100%</div>
                    <div className="text-sm text-orange-600">Job Support</div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Technologies Section */}
            {showContent && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-8 md:mb-10 p-4 md:p-6 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-blue-100"
              >
                <h3 className="text-lg md:text-xl font-bold text-blue-900 mb-4">Technologies You&apos;ll Master</h3>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                  <div className="flex flex-col items-center p-3 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                    <FaDatabase className="text-blue-500 text-2xl mb-2" />
                    <span className="text-xs font-medium text-blue-900">SQL</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-yellow-50 rounded-xl hover:bg-yellow-100 transition-colors">
                    <FaPython className="text-yellow-500 text-2xl mb-2" />
                    <span className="text-xs font-medium text-yellow-900">Python</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-yellow-50 rounded-xl hover:bg-yellow-100 transition-colors">
                    <VscAzure className="text-yellow-600 text-2xl mb-2" />
                    <span className="text-xs font-medium text-yellow-900">Power BI</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                    <VscAzure className="text-blue-600 text-2xl mb-2" />
                    <span className="text-xs font-medium text-blue-900">Azure</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                    <SiPandas className="text-blue-600 text-2xl mb-2" />
                    <span className="text-xs font-medium text-blue-900">Pandas</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <BsGearFill className="text-gray-600 text-2xl mb-2" />
                    <span className="text-xs font-medium text-gray-900">ETL</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Curriculum Sections */}
            {showContent && modules.map((module, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05, type: "spring", stiffness: 90 }}
                viewport={{ once: true, amount: 0.2 }}
                className="mb-8 md:mb-10"
              >
                <h2 className="text-xl md:text-2xl font-bold text-blue-900 mb-6 text-center">
                  {module.title}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {module.topics.map((topic, j) => (
                    <CurriculumCard key={j} {...topic} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right side - Sticky Inquiry Form */}
          <div className="lg:w-[35%]">
            <div className="sticky top-28 bg-white/80 backdrop-blur-md rounded-2xl p-4 md:p-5 shadow-xl border border-blue-200 max-h-[calc(100vh-8rem)] overflow-y-auto">
              <div className="mb-4 text-center">
                <h3 className="text-lg md:text-xl font-bold mb-2 text-blue-900">
                  Start Your Data Analyst Journey
                </h3>
                <p className="text-xs text-neutral-600 mb-4">
                  Master data analysis with industry-standard tools
                </p>
              </div>
              
              {/* Compact Benefits Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs text-neutral-600 mb-4">
                <div className="flex items-center gap-1">
                  <svg className="w-3 h-3 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>40+ hours training</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-3 h-3 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>10+ projects</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-3 h-3 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Industry tools</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-3 h-3 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Resume prep</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-3 h-3 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Lifetime access</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-3 h-3 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Expert support</span>
                </div>
              </div>

              <div className="border-t border-blue-100 pt-3">
                <h4 className="font-semibold text-blue-900 mb-3 text-center text-sm">
                  Contact for Pricing & Enrollment
                </h4>
                <CompactCourseInquiryForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 