import React, { useState, useEffect, useRef } from "react";
import parse from "html-react-parser";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Header } from "../Common/Header";
import { Loader } from '../Common/Loader';
import { DocumentListModal } from "./DocumentListModal";
import axiosInstance from "../../helper/axiosInstance";

interface VotingDocumentOption {
  id: string;
  title: string;
  content: string;
  image_url: string;
}

function IdCheckList() {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);
  const [documentOptions, setDocumentOptions] = useState<VotingDocumentOption[]>([]);
  const [animationClass, setAnimationClass] = useState("");
  const [modal, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const hasFetchedData = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance({
          url: "voting-document/options/get-all",
          method: "GET",
        });
        setDocumentOptions(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!hasFetchedData.current) {
      fetchData();
      hasFetchedData.current = true;
    }

    return () => {
      hasFetchedData.current = false;
    };
  }, []);
  
  // Handle the onClick event after rendering HTML
  useEffect(() => {
    const elements = document.querySelectorAll('[data-id="modal-trigger"]');
    
    elements.forEach((element) => {
      element.addEventListener('click', () => {
        setModalOpen(true); 
      });
    });

    return () => {
      elements.forEach((element) => {
        element.removeEventListener('click', () => {
          setModalOpen(true);
        });
      });
    };
  }, [documentOptions]); 

  const changeOption = (index: number) => {
    if (index === activeSlide) return;
    const direction = activeSlide < index ? "next" : "prev";
    setAnimationClass(direction === "next" ? "slide-out-right" : "slide-out-left");
    setTimeout(() => {
      setActiveSlide(index);
      setAnimationClass(direction === "next" ? "slide-in-right" : "slide-in-left");
    }, 300);
  };

  const setModalClose = () => {
    setModalOpen(false);
  };

  // Handle Previous and Next Slide
  const handleNext = () => {
    if (activeSlide < documentOptions.length - 1) {
      setActiveSlide(activeSlide + 1);
    }
  };

  const handlePrev = () => {
    if (activeSlide > 0) {
      setActiveSlide(activeSlide - 1);
    }
  };

  return (
    <>
      <main className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6 min-vh-100 content-area-main">
            <div className="content-area">
              <Header showprogress={true} total_steps={6} current_step={4} title="What ID to bring" subtitle="" />
              <div className="card p-4" style={{ borderRadius: '8px' }}>
                {loading ? (
                  <Loader />
                ) : documentOptions.length === 0 ? (
                  <div className="no-content-found"><p>No content found. Please try again later.</p></div>
                ) : (
                  <>
                    <div className="mb-4">
                      <p className="find-title mb-4">Introduction</p>
                      <ul>
                        <li className="find-check-list mb-2">Do you have the right ID to bring to vote? Let's make sure you're prepared.</li>
                        <li className="find-check-list mb-2">We'll show you what ID works and what to do if you don't have the required pieces.</li>
                      </ul>
                      <p className="find-info-p mb-0">You may be surprised to learn how many ways there are to identify yourself!</p>
                    </div>
                    <div id="idCarousel" className="carousel p-4">
                      <div className="carousel-inner">
                        {documentOptions.map((option, index) => (
                          <div key={index} className={`carousel-item ${index === activeSlide ? "active" : ""} ${index === activeSlide ? animationClass : ""}`} onAnimationEnd={() => setAnimationClass("")}>
                            <div className="mb-2">
                              <h6 className="find-option-title mb-3">{option.title}</h6>
                              <div>{parse(String(option.content))}</div>
                              <div className="text-center">
                                <img className="rounded-2" src={option.image_url} width={320} height={200} alt={`ID Option ${index + 1}`} />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="carousel-indicators position-relative mb-0">
                        {documentOptions.map((_, index) => (
                          <button key={index} type="button" className={`carousel-dots ${activeSlide === index ? "bg-warning active" : ""}`} onClick={() => changeOption(index)} aria-label={`Slide ${index + 1}`} />
                        ))}
                      </div>
                    </div>
                    <div className="carousel-controls">
					  <button className="carousel-control-prev" onClick={handlePrev}>
						<span className="carousel-control-prev-icon"></span> {/* Left arrow */}
					  </button>
					  <button className="carousel-control-next" onClick={handleNext}>
						<span className="carousel-control-next-icon"></span> {/* Right arrow */}
					  </button>
					</div>
                  </>
                )}
              </div>
              {documentOptions.length === activeSlide + 1 ? (
                <div className="p-1">
                  <button className="next-button btn w-100 py-3 rounded-4 button-text" onClick={() => navigate("/voting-fun-facts")}>NEXT MODULE</button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </main>
      <DocumentListModal isOpen={modal} onClose={setModalClose} />
    </>
  );
}

export default IdCheckList;
