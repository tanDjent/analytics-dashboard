import * as Dialog from "@radix-ui/react-dialog";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Globe, FileText, X } from "lucide-react";

interface UserDetailsModalProps {
  open: boolean;
}

const UserDetailsModal = ({ open }: UserDetailsModalProps) => {
  return (
    <Dialog.Root open={open}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-200" />

        <Dialog.Content className="fixed left-1/2 top-1/2 w-[420px] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-xl outline-none animate-in zoom-in-95 duration-200">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <img
                src="/profile.jpg"
                alt="Tanmay Verma"
                className="h-16 w-16 rounded-full object-cover"
              />

              <div>
                <Dialog.Title className="text-lg font-semibold text-gray-900">
                  Tanmay Verma
                </Dialog.Title>

                <p className="text-sm text-gray-500">Frontend Engineer</p>
              </div>
            </div>

            <Dialog.Close asChild>
              <button className="rounded-md p-2 text-gray-500 transition hover:bg-gray-100">
                <X size={18} />
              </button>
            </Dialog.Close>
          </div>

          <Dialog.Description className="mt-5 text-sm leading-relaxed text-gray-600">
            Frontend engineer specializing in React, TypeScript, and modern web
            applications. Passionate about building performant and intuitive
            user experiences.
          </Dialog.Description>

          <div className="mt-6 flex flex-col gap-3">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-xl border border-gray-200 p-3 transition hover:bg-gray-50"
            >
              <FaGithub size={18} />
              <span>GitHub</span>
            </a>

            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-xl border border-gray-200 p-3 transition hover:bg-gray-50"
            >
              <FaLinkedin size={18} />
              <span>LinkedIn</span>
            </a>

            <a
              href="https://yourportfolio.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-xl border border-gray-200 p-3 transition hover:bg-gray-50"
            >
              <Globe size={18} />
              <span>Portfolio</span>
            </a>

            <a
              href="/Tanmay_Verma_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-xl border border-gray-200 p-3 transition hover:bg-gray-50"
            >
              <FileText size={18} />
              <span>Resume</span>
            </a>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default UserDetailsModal;
