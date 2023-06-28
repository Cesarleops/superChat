"use client";
import { BsArrowRight } from "react-icons/bs";
import { SearchModal } from "./SearchModal";
import { useState } from "react";

export const ModalCard = () => {
  const [showingModal, setShowingModal] = useState(false);
  return (
    <section>
      <BsArrowRight
        className="w-10 h-10 p-3 bg-terciary text-5xl text-bold text-secondary rounded-full"
        onClick={() => setShowingModal(!showingModal)}
      />
      {showingModal && (
        <SearchModal onClick={() => setShowingModal(!showingModal)} />
      )}
    </section>
  );
};
