import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "../components/pages/home";
import AboutPage from "../components/pages/about";
import TermsPage from "../components/pages/terms";
import AssistancePage from "../components/pages/assistance";
import DetailsPage from "../components/pages/tour_details";
import CompaniesPage from "../components/pages/companiesPage";
import CompanyDetailsPage from "../components/pages/companyDetails";

const AppRouter = () => {
  return (
    <Routes>
      <Route>
        <Route path="/" element={<HomePage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/companiespage" element={<CompaniesPage />} />
        <Route path="/aboutpage" element={<AboutPage />} />
        <Route path="/termspage" element={<TermsPage />} />
        <Route path="/assistancepage" element={<AssistancePage />} />
        <Route path="/tour-details/:id" element={<DetailsPage />} />
        <Route path="/companydetails/:id" element={<CompanyDetailsPage />} />
        {/* <Route path="/homepage/DetailsPage/:travelId" element={<DetailsPage/>} />
      <Route path="AddFomrPage" element={<AddFormPage />} /> */}
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRouter;
