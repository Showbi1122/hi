"use client";

import { Reveal } from "@/components/ui/Reveal";
import { experienceItems, skillBars, processSteps } from "@/data/home";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

export function ExperienceSkills() {
  const boxes = [
    ...experienceItems.map((item) => ({
      small: `${item.period} (${item.role})`,
      title: item.company,
      body: item.description,
    })),
    ...processSteps.slice(0, 2).map((step) => ({
      small: `Process ${step.step}`,
      title: step.title,
      body: step.description,
    })),
  ].slice(0, 4);

  return (
    <div className="skill-area section-padding" id="experience">
      <div className="glint-container">
        <div className="row items-center">
          <div className="col-lg-6">
            <div className="heading white">
              <strong className="filltext">my carrer</strong>
              <small>MY EXPERIENCE</small>
              <h2>
                Experience and <span>skill</span>
              </h2>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="info-content">
              <p>
                Hands-on delivery at agencies and product teams, with a stack focused on
                modern web apps and SEO.
              </p>
            </div>
          </div>
        </div>
        <div className="space-60" />
        <div className="row">
          {boxes.map((box, i) => (
            <div key={box.title} className="col-sm-6 col-lg-3 mb-6">
              <Reveal delay={i * 0.08}>
                <div className="skill-box">
                  <small>{box.small}</small>
                  <h5>{box.title}</h5>
                  <p>{box.body}</p>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
      <div className="space-100" />
      <div className="skill__circles">
        <div className="glint-container">
          <div className="row">
            {skillBars.slice(0, 4).map((skill, i) => (
              <div key={skill.name} className="col-sm-6 col-lg-3 text-center mb-8">
                <Reveal delay={i * 0.1}>
                  <SkillCircle percent={skill.percent} label={skill.name} />
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SkillCircle({ percent, label }: { percent: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const r = 54;
  const c = 2 * Math.PI * r;
  const offset = c - (percent / 100) * c;

  return (
    <div className="glint-circle" ref={ref}>
      <svg width="150" height="150" viewBox="0 0 150 150" aria-hidden>
        <circle cx="75" cy="75" r={r} fill="none" stroke="#fff" strokeWidth="6" />
        <motion.circle
          cx="75"
          cy="75"
          r={r}
          fill="none"
          stroke="#08d665"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: reduce ? offset : c }}
          animate={{ strokeDashoffset: inView || reduce ? offset : c }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          transform="rotate(-90 75 75)"
        />
      </svg>
      <strong>
        {percent}
        <i>%</i>
      </strong>
      <span>{label}</span>
    </div>
  );
}
