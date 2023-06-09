"use client";
import { BsArrowRight } from "react-icons/bs";
import { SearchModal } from "./SearchModal";
import { useState } from "react";

export const ModalCard = () => {
  const [showingModal, setShowingModal] = useState(false);
  return (
    <section>
      <BsArrowRight
        className="w-[50px] h-[50px] p-3 bg-white text-5xl font-bold text-secondary rounded-full"
        onClick={() => setShowingModal(!showingModal)}
      />
      {showingModal && (
        <SearchModal onClick={() => setShowingModal(!showingModal)} />
      )}
    </section>
  );
};
