import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import "./Landingpage.css";

import logo from "./Logo.png";


gsap.registerPlugin(ScrollTrigger);

const LandingPage = () => {
  const logoRef = useRef(null);
  const headingRef = useRef(null);
  const aboutRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

//     // Logo animation
    tl.fromTo(
      logoRef.current,
      { y: window.innerHeight, scale: 0.5, opacity: 0 },
      { y: 0, scale: 1, opacity: 1, duration: 1.8 }
    )

      // Heading animation
      .fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2 },
        "-=0.8"
      );

    // 🔹 About Section Animations (triggered on scroll)
    gsap.fromTo(
      aboutRef.current.querySelector("h2"),
      { y: 80, scale: 0.6, rotateX: 90, opacity: 0 },
      {
        y: 0,
        scale: 1,
        rotateX: 0,
        opacity: 1,
        duration: 1.5,
        ease: "elastic.out(1, 0.6)",
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      aboutRef.current.querySelectorAll("p"),
      { x: -80, opacity: 0, skewX: -10 },
      {
        x: 0,
        opacity: 1,
        skewX: 0,
        duration: 1.2,
        stagger: 0.25,
        ease: "power3.out",
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 85%",
        },
      }
    );

    // Strong text highlight (pulse effect)
    gsap.fromTo(
      aboutRef.current.querySelectorAll("strong"),
      { scale: 1, color: "#cd0404ff" },
      {
        scale: 1.2,
        color: "#e91e0cff",
        yoyo: true,
        repeat: 1,
        duration: 0.6,
        stagger: 0.4,
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 75%",
        },
      }
    );

    // 🔹 Footer Section (scroll-trigger advanced animation)
    gsap.fromTo(
      footerRef.current,
      { opacity: 0, y: 100, rotateY: 90 },
      {
        opacity: 1,
        y: 0,
        rotateY: 0,
        duration: 1.5,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
        },
      }
    );
  }, []);

  return (
    <div>
        
      <div className="box">
        <div className="content">
          <img ref={logoRef} src={logo} alt="Logo" />
          <h1 ref={headingRef}> & ATTENDANCE SYSTEM</h1>
          <Link to="/login"><button className="Login">Login</button></Link>
          <Link to="/signup"><button className="Sign-up">Signup</button></Link>
        </div>
      </div>

     
      <div className="About">
           <div className="about-section" ref={aboutRef}>
        <h2>About Our System</h2>
        <p>
          The Placement Management System (PMS) is a comprehensive digital
          platform designed to simplify and enhance the campus recruitment
          process. It connects students, administrators, and recruiters through
          a unified portal, ensuring transparency and efficiency.
        </p>
        <br/>
        <p>
          <strong>For Students:</strong> PMS allows students to create profiles,
          upload resumes, apply for jobs, and track application status in
          real-time. Notifications ensure students never miss an important
          update regarding recruitment drives or interviews.
        </p>
        <br/>
        <p>
          <strong>For Administrators:</strong> Placement coordinators can manage
          student databases, company information, and placement schedules
          efficiently. Reports and analytics make it easier to track placement
          performance and trends.
        </p>
        <br/>
        <p>
          <strong>For Companies:</strong> Recruiters can view eligible
          candidates, shortlist profiles, and conduct interviews seamlessly. The
          system reduces manual effort and ensures a professional hiring
          process.
        </p>
        <br/>
        <p>
          With secure authentication, a user-friendly interface, and
          data-driven reports, PMS transforms traditional placement procedures
          into a modern, reliable, and effective digital solution.
        </p>
        <br/>
      </div>
      </div>
        <footer className="footer">
      <div className="footer-container">
        
       
        <div className="footer-section">
          <h2 className="footer-logo">Student Performance And Attendance System</h2>
          
        </div>

     
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/login">Login</a></li>
          </ul>
        </div>

       
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: support@studentattendance.com</p>
          <p>Phone: +91 98765 43210</p>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Placement Management System. All Rights Reserved.
      </div>
    </footer>
    </div>
  );
};

export default LandingPage;
