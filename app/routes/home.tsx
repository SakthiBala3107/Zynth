import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import Navbar from "../../components/Navbar";
import { ArrowRight, ArrowUpRight, Clock, Layers } from "lucide-react";
import Button from "../../components/ui/Button";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (<>
    <Navbar />
    {/* hero */}
    <section className="hero">
      <div className="announce">
        <div className="dot">
          <div className="pulse"></div>
        </div>

        <p>Introducing Roomify 2.0</p>
      </div>

      <h1>Build beautiful spaces at the speed of thought with Roomify</h1>

      <p className="subtitle">
        Zynth is an AI-first  design environment that helps you visualize, render, and ship architectural projects faster  than ever.
      </p>

      <div className="actions">
        <a href="#upload" className="cta">
          Start Building <ArrowRight className="icon" />
        </a>

        <Button variant="outline" size="lg" className="demo">
          Watch Demo
        </Button>
      </div>

      <div id="upload" className=" upload-shell">
        <div className="grid-overlay" />
        <div className="upload-card">
          <div className="upload-icon">
            <Layers className="icon"></Layers>
          </div>
          <h3>Upload your floor plan</h3>
          <p>Supports JPG, PNG, formats up to 10 MB</p>
        </div>

        <p>Upload images</p>
      </div>
    </section>
    {/*  projects*/}

    <section className="projects">
      <div className="section-inner">
        <div className="section-head">
          <div className="copy">
            <h2>Projects</h2>
            <p>Your latest work and shared commmunity projects, all in on place.</p>
          </div>
        </div>
        {/*  */}
        <div className="projects-grid">
          <div className="project-card group">
            <div className="preview">
              <img src="#" alt="Project" />
              <div className="badge"><span>Community</span></div>
            </div>
            {/*  */}
            <div className="card-body">
              <div className="">
                <h3>Project Manhattan</h3>
                <div className="meta">
                  <Clock size={12} />
                  <span>{new Date('01.01.2027').toLocaleDateString()}</span>
                  <span> By Azula</span>
                </div>
              </div>

              <div className="arrow">
                <ArrowUpRight size={18} />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

  </>)
}
