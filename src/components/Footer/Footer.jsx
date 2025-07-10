import { Facebook, Linkedin, Twitter } from "lucide-react";

function Footer() {
  return (
    <>
      <footer class="bg-background py-16 sm:py-20">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 gap-12 md:grid-cols-12 lg:gap-8">
            <div class="md:col-span-12 lg:col-span-4">
              <div class="flex items-center gap-3">
                <svg
                  class="h-8 w-8 text-brand"
                  fill="none"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z"
                    fill="currentColor"
                  ></path>
                </svg>
                <h2 class="font-poppins text-2xl font-bold text-primary ">
                  Daf3a
                </h2>
              </div>
              <p class="mt-4 text-base text-secondary ">
                Your launchpad to a successful career through expert mentorship
                and skill development.
              </p>
            </div>
            <div class="md:col-span-4 lg:col-span-2">
              <h3 class="font-poppins text-base font-semibold text-primary">
                Platform
              </h3>
              <ul class="mt-4 space-y-3">
                <li>
                  <a
                    class="text-base link-secondary  transition-colors link-secondary:hover"
                    href="#"
                  >
                    Find a Mentor
                  </a>
                </li>
                <li>
                  <a
                    class="text-base link-secondary  transition-colors link-secondary:hover"
                    href="#"
                  >
                    Become a Mentor
                  </a>
                </li>
                <li>
                  <a
                    class="text-base link-secondary  transition-colors link-secondary:hover"
                    href="#"
                  >
                    Workshops
                  </a>
                </li>
                <li>
                  <a
                    class="text-base link-secondary  transition-colors link-secondary:hover"
                    href="#"
                  >
                    CV Builder
                  </a>
                </li>
              </ul>
            </div>
            <div class="md:col-span-4 lg:col-span-2">
              <h3 class="font-poppins text-base font-semibold text-primary">
                Resources
              </h3>
              <ul class="mt-4 space-y-3">
                <li>
                  <a
                    class="text-base link-secondary  transition-colors link-secondary:hover"
                    href="#"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    class="text-base link-secondary  transition-colors link-secondary:hover"
                    href="#"
                  >
                    Success Stories
                  </a>
                </li>
                <li>
                  <a
                    class="text-base link-secondary  transition-colors link-secondary:hover"
                    href="#"
                  >
                    Guides
                  </a>
                </li>
                <li>
                  <a
                    class="text-base link-secondary  transition-colors link-secondary:hover"
                    href="#"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div class="md:col-span-4 lg:col-span-2">
              <h3 class="font-poppins text-base font-semibold text-primary">
                Company
              </h3>
              <ul class="mt-4 space-y-3">
                <li>
                  <a
                    class="text-base link-secondary  transition-colors link-secondary:hover"
                    href="#"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    class="text-base link-secondary  transition-colors link-secondary:hover"
                    href="#"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    class="text-base link-secondary  transition-colors link-secondary:hover"
                    href="#"
                  >
                    Press
                  </a>
                </li>
              </ul>
            </div>
            <div class="md:col-span-4 lg:col-span-2">
              <h3 class="font-poppins text-base font-semibold text-primary">
                Support
              </h3>
              <ul class="mt-4 space-y-3">
                <li>
                  <a
                    class="text-base link-secondary  transition-colors link-secondary:hover"
                    href="#"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    class="text-base link-secondary  transition-colors link-secondary:hover"
                    href="#"
                  >
                    Help Center
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="mt-12 border-t border-[var(--border)] pt-8">
            <div class="flex flex-col-reverse items-center justify-between gap-6 sm:flex-row">
              <p class="text-sm text-secondary">
                © 2025 Daf3a. All rights reserved.
              </p>
              <div class="flex items-center gap-4">
                <a
                  class="text-sm link-secondary transition-colors hover:link-secondary"
                  href="#"
                >
                  Terms
                </a>
                <a
                  class="text-sm link-secondary transition-colors hover:link-secondary"
                  href="#"
                >
                  Privacy
                </a>
                <a
                  class="text-sm link-secondary transition-colors hover:link-secondary"
                  href="#"
                >
                  Cookie
                </a>
                <a
                  class="text-sm link-secondary transition-colors hover:link-secondary"
                  href="#"
                >
                  Data Protection
                </a>
              </div>
              <div class="flex items-center gap-4">
                <a
                  class="text-sm link-secondary transition-colors hover:link-secondary"
                  href="#"
                >
                  <Facebook class="h-6 w-6" />
                </a>
                <a
                  class="text-sm link-secondary transition-colors hover:link-secondary"
                  href="#"
                >
                  <Twitter class="h-6 w-6" />
                </a>
                <a
                  class="text-sm link-secondary transition-colors hover:link-secondary"
                  href="#"
                >
                  <Linkedin class="h-6 w-6" />
                </a>
              </div>
            </div>
            <div class="mt-6 flex justify-center sm:justify-start">
              <a
                class="text-sm link-secondary transition-colors hover:link-secondary"
                href="mailto:contact@daf3a.com"
              >
                contact@daf3a.com
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
