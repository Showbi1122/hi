"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const fadeDown = {
  hidden: { opacity: 0, y: -36 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.15 + i * 0.15,
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <div className="welcome-area-wrap welcome__wrap1" id="hero">
      <div
        className="single-welcome-area home_1"
        itemScope
        itemType="https://schema.org/Person"
      >
        <div className="glint-container">
          <div className="row">
            <div className="col-lg-7">
              <div className="wlc-title white">
                <motion.h1
                  id="hero-title"
                  itemProp="name"
                  custom={0}
                  variants={fadeDown}
                  initial={reduce ? false : "hidden"}
                  animate="show"
                  className="fadeInDown animated"
                >
                  <span>Apps, POS &amp; SaaS</span> built for real businesses
                </motion.h1>
                <motion.p
                  itemProp="description"
                  custom={1}
                  variants={fadeDown}
                  initial={reduce ? false : "hidden"}
                  animate="show"
                  className="fadeInDown animated"
                >
                  I help startups and businesses launch fast, SEO-ready websites and custom
                  software — from company websites to POS systems, CRM tools, and SaaS
                  products.
                </motion.p>
                <motion.div
                  custom={2}
                  variants={fadeDown}
                  initial={reduce ? false : "hidden"}
                  animate="show"
                >
                  <Link href="/contact" className="cbtn cbnt1 fadeInDown animated">
                    Getting Started <i className="cbtn-ico">→</i>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
        <div className="wlc-author-1">
          <Image
            src="/assets/home/taleeb.webp"
            alt="Malik Taleeb Shahbaz, software developer and web developer in Abbottabad, Pakistan"
            width={760}
            height={1013}
            priority
            fetchPriority="high"
            itemProp="image"
          />
          <h1 className="wlc-filltext">MTS</h1>
        </div>
      </div>
    </div>
  );
}
