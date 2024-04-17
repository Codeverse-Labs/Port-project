-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 17, 2024 at 02:24 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `billmanagementsystem`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `Id` int(11) NOT NULL,
  `Name` varchar(20) NOT NULL,
  `Position` varchar(100) NOT NULL,
  `Dpt` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`Id`, `Name`, `Position`, `Dpt`) VALUES
(701138858, 'Mr W. A. Chandana Si', 'Snr. Training Mgr.', 'MPMA'),
(701284885, 'Major. Gen. A. L. S.', 'Director (Security)', 'Security'),
(701917762, 'Mr. C. P. P. K. Gama', 'Snr. Mgr. Security', 'Security'),
(701917768, ' Trico cargo Unit ', 'Ingurukade', 'Security'),
(702582047, 'Tide Guage', 'Trinco', 'Trinco'),
(702582048, 'Tide Guage', 'Galle', 'Galle'),
(702582051, 'Mr. Pradeep Ranasing', 'Senior Managers (IS)', 'IS'),
(702582054, 'Miss. G. H. R. Perer', 'Dy. Chief Finance Manager ', ' Finance'),
(702582056, 'Mr. H.J.K.U. Kumara', 'Actg.Chief Operations Manager (CC)   ', 'Ops'),
(702582058, 'Dr.(Mrs) U.S Jayasek', 'Actg.Chief Medical Officer', 'Medical'),
(703099860, ' Mr. P.R. Ekneligoda', 'SME (W- II)', 'MW'),
(703099887, 'Mr. P. K. Rajapaske ', 'SME (W- I)', 'MW'),
(703099938, 'Mr. C. Bandara', 'SME (MP -I)', 'MP'),
(703100141, 'Mr. R. P. P. Krishan', 'SME (MP-II)', 'MP'),
(703100278, 'Mr. D. M. S. D. Diss', 'Supdt Civil Eng. ', 'Deve'),
(703100561, 'Mr. U. Uthayasunthar', 'Supdt. Civil Eng.', 'Deve'),
(703100695, 'Mrs. B. S. R. Nanaya', 'Supdt. Civil Eng.', 'Civil '),
(703101309, 'Mr. W. A. T. Wickram', 'Supdt Civil Eng.', 'Civil '),
(703101362, 'Mr. L. G. P. Jayanth', 'Supdt Civil Eng. (Dev.)', 'Civil '),
(703101488, ' Mrs.  H. B.A.Subhas', 'S.E.E II', 'EE'),
(703101492, 'Mr. S. G. P. D. Suba', 'Dy. Chief Mgr. (Premises)', 'P & D'),
(703101531, 'Mr. EMACPN Ekanayake', 'DCE (C&D)', 'C & D'),
(703101583, ' Mr. K.A.R. Chanaka', 'Supdt. Civil Engineer (Contracts)', 'C & D'),
(703101737, ' Mr. K. W. M. C. Wan', 'S.M.E. (Marine I)', 'Marine'),
(703101745, ' Mr. W.L.D.S Amarath', 'Dy.Chief Engineer (Marine II)', 'Marine'),
(703101750, 'Mr. E. G. S. D. De S', 'S.E.E I', 'EE'),
(703101981, 'Mr. G. A. A. Upendra', 'S.E.E III', 'EE'),
(705954660, 'Mr. Sujeewa Wijerath', 'Insurance Inquaries', 'Secretariat'),
(706228331, 'Mr. W. K. G Wijenaya', 'Dy Chief Engineer (P&D)', 'P & D'),
(706336410, 'Dr. Sanduni Liyanage', 'Actg Dy. Chf  Medical Officer', 'Medical'),
(706336551, 'DCE Marine  (I)', 'N. N. J. A. Kumara', 'Marine'),
(711006386, 'Chairman', '', 'Secretariat'),
(711006406, 'Galle Port', '', ''),
(711732205, 'Mr. A. B. M. Aswer', 'Dy. Chief Operations Mgr. (C/C)', 'Ops'),
(711732275, 'Mrs. Pamudi P. Weera', 'Secretary to the Board', 'Legal'),
(711732332, 'Mr. Vajira Karunarat', 'Dy.Chief Manager (Statistics)', 'Ops'),
(711732453, 'Mrs. A.A.T. D. Senev', 'Snr. Law Officer', 'Legal'),
(711732711, 'Mr. K.S. Hettiarachi', 'Chief Manager (S & MM)', 'Supply'),
(712259855, 'D/O - Datacom', 'Elect. & E. E. . Div', 'EE'),
(713257861, 'Mr. C. Singankuttiar', 'Senior Managers (IS)', 'IS'),
(713257867, 'Mr. Kusal Lokugama', 'Managers (IS)', 'IS'),
(713257886, 'Miss. M. S. Liyanago', 'Senior Managers (IS)', 'IS'),
(714216883, 'Mr.. T K G L Hemacha', 'CEE (Electrical)', 'EE'),
(714816898, 'Duty Manager', 'Duty Team -JCT', 'Ops'),
(714818660, 'Mr. W. A. T. Fernand', 'Managers (IS)', 'IS'),
(715324105, 'D/O Security', 'QRT Office', 'Security'),
(715330227, ' Mr. M. A. H. A. Muh', 'Chief. Supdt. (Operations)', 'Ops'),
(715337578, 'Audit D/O', 'Audit', 'Audit'),
(715362339, ' Mr. H. M. Prabath J', 'Director  (Logistics)', 'Logistics'),
(716338180, 'Mrs.  B. D. S. Malka', 'Senior Manager (Administation)', ' Finance'),
(716338185, 'Mrs. D.N. Pannipitiy', 'SMF (Exp/ Other Divisions) ', ' Finance'),
(716338186, ' Mr. N.C.S.De Costa', 'SMF (Rev/Credit Control)', ' Finance'),
(716338188, ' Mr. T.A.I. Amarasin', 'SFM (Fin. Acc./Mgt.Acct.)          ', ' Finance'),
(716338261, ' Mr. T.H.H.N. Perera', 'SMF (Rev/Landing & Delivery)', ' Finance'),
(716364040, 'Mr. N. H. Gaeusinghe', 'DCE Mech. Plant (II)', 'MP'),
(716364047, ' Mr. G.V. Kekulawala', 'SMF (E/E & N- Supplies Acct. )', ' Finance'),
(716413278, 'Ms. G. A. D. C. Pere', 'Dy Chief Eng (P/P)', 'P & D'),
(716413282, 'Mr. R. Thushanthan', 'SME (Marine II)', 'Marine'),
(716413295, 'Mr. P. P. Pradeep Ni', 'Dy. Chif Mgr (L)', 'Logistics'),
(716413303, 'Mr. I. N. wickramana', 'CPAC', 'HR'),
(716413307, 'Mr. I. N. wickramana', 'CPAC', 'HR'),
(716413315, 'Chf. Ops. Mgr. ', 'Common  use', 'Ops'),
(716413317, 'Chf. Ops. Mgr. ', 'Common  use', 'Ops'),
(716413320, 'Dy. Chf. Mgr. (IS)', 'Common  use', 'IS'),
(716413325, 'Mr. K. D. J. Wijendr', 'Chief Supdt. Security (Galle)', 'Security'),
(716413329, 'Chf. Ops. Mgr. ', 'Common  use', 'Ops'),
(716413334, 'Chf. Mgr. (IS)', 'Common  use', 'IS'),
(716413335, 'Mr. M. M. N. P. Guna', 'Snr. Internal auditor', 'IS'),
(716413417, 'Mr. R.M. Anura Shant', 'Snr .Manager (Admn. Sup.', 'Supply'),
(716413425, 'Chf. Medical Officer', 'Common  use', 'Medical'),
(716413427, 'Chf. Medical Officer', 'Common  use', 'Medical'),
(716810876, 'Duty Engineer(JCT /E', 'Stage 1 &2 ', 'EE'),
(716810877, 'Duty Engineer(JCT /E', 'Stage 3 & 4', 'EE'),
(716810878, ' Mr. S. Chandrasena ', 'ME (JCT I) ', 'MP'),
(716810879, ' Mr. K. C. M. Wanasi', 'ME (JCT  V)                  ', 'MP'),
(716810880, 'Operations Office', 'AUS Operations', 'Ops'),
(716810881, 'Duty Officer I & II', 'Duty team (JCT)', 'Ops'),
(716810883, 'Imports ', 'Duty Officer                                               ', 'Ops'),
(716810884, 'Guide Pier & PVQ', 'Duty Officer (GP/ PVQ)', 'Ops'),
(716823709, 'Security Control Roo', 'Security duty Officer (On Duty)                        ', 'Security'),
(716841457, 'Supdt EF V', '', 'EE'),
(716845148, ' Mr. L. Premasiri De', 'Chief Internal Auditor   ', 'Audit'),
(716889241, 'Mr. M. S. Niyasdeen', 'Accountant (T)', 'Trinco'),
(716889264, 'Mr. R. A. P. P.  Rup', 'Chief Engineer  (Acting)', 'EE'),
(716889266, ' Mr. A.L.M. Naheem', 'Dy Chief Engineer (Civil)', 'Civil '),
(716889285, 'Mr. M. V. S. Fernand', 'DCE (MW)', 'MW'),
(716889398, 'Mr. S. K. F. Rodrigo', 'Dy. Chief Engineer 1', 'EE'),
(716889416, 'Duty mobile phone GC', 'Electrical Section III', 'EE'),
(716889431, 'Duty mobile phone GC', 'Electrical Section III', 'EE'),
(716889451, 'Mr. Chiranthaka Halp', 'Duty Officer  (Maketing)', 'M & BD'),
(717243542, 'Mr. Wikum Silva', 'Senior Managers (IS)', 'IS'),
(718531719, '', 'IS Div. (for Sms)', 'IS'),
(718531721, 'Mr. M. H. A.Shiyam', 'Managers (IS)', 'IS'),
(718531739, 'ISPS Navy', 'Navy', 'Security'),
(718531790, 'Duty  Officer', 'Mega Port (Elect. I)', 'EE'),
(718531796, 'Mr. K.P. Jayathullah', 'Chief Supdt (sec) Trinco', 'Trinco'),
(718531859, 'Duty Officer (Peliya', 'Duty Officer (Peliyagoda) ', 'Logistics'),
(718531862, 'D/O Kitchen', 'Kitchen (Admn)', 'welfare'),
(718531863, 'Mr. Chitral R. Jayaw', 'Chief Manager  (Com. & PR)', 'Media'),
(718531871, 'Mr. SMN Karunarathna', 'Snr. Ops  Manager (Plans & Ops)', 'Ops'),
(718531897, 'Mr. P.A.R.D. Pathira', 'Director (Technical)', 'Engineering'),
(718551693, 'Mrs. F.M. Husain', 'Chief Engineer (P&D)', 'P & D'),
(718551949, ' Mr. S.H. Thilakapal', 'Actg.Chief Manager (W & IR)', 'Welfare'),
(718553163, 'Mr. S. H. Pathirathn', 'Senior Managers (IS)', 'IS'),
(718553264, 'Mr. Upul Guruge', 'Comm. & Media Officer', 'Media'),
(718553483, 'Mr. C.L.Dasanayake', 'Dy Chief Engineer(Deve.)', 'Deve'),
(718553565, 'Ipad', 'MD', 'Secretariat'),
(718553647, 'Mrs. L. Hewagajaman', 'Dy. Chief Manager ( IS )', 'IS'),
(718688304, 'Mr. T.C.K. Paranavit', 'Chief Engineer (Civil)', 'Civil '),
(718688311, 'Mr. H. H. U. Peiris', 'Manager (Com.& PR)', 'Media'),
(718688314, 'Mrs.Aparna Thilakara', 'Chief Law Officer', 'Legal'),
(718688318, 'Capt K.M.N.P Silva', 'Harbour Master', 'Navigation'),
(718688322, 'Mr. Upul Jayatissa', 'Managing Director', 'Secretariat'),
(718688326, 'Mr. A.A.S.R. Abeysir', 'Addl. Managing Director (Technical) ', 'Secretariat'),
(718688335, 'Mr. Sarath Dayananda', 'Chief Manager (M & BD)', 'M & BD'),
(718688336, 'Mr. D.L.R. Weerasing', ' Director (Operations)', 'Ops'),
(718688337, 'Mr. P. D. H. Pieris', 'Chief Sup.dt (Berth Planning)', 'Ops'),
(718688338, ' Mr. C.J Weerawickra', 'Chief Manager (Cont. Ops)', 'Ops'),
(718688342, 'Mr. W. Pradeep perer', 'Snr.Operation Manager (OPS)', 'Ops'),
(718688343, 'QRT Office', 'Security ', 'Security '),
(718688344, 'Mr. KC Samarajeewa', 'Manager ops- BQ', 'Ops'),
(718688346, 'Capt.A. M. S. P. Ara', 'Deputy Harbour Master (T)       ', 'Trinco'),
(718688347, 'Mr. Nirmal De Fonsek', 'Chief Manager (IS)', 'IS'),
(718688348, 'Mr. Nalin Aponso ', ' Director  (HRD)', 'HR'),
(718688349, 'Mr. J. A. Chandrarat', 'Chief Engineer (M/W)', 'MW'),
(718688350, 'D/O Media', '', 'Media'),
(718688351, 'Mr. M. R. M.  Ramzee', 'Administrative Secretary', 'Legal'),
(718688352, 'Mr. B.L.M. Inas', 'Dy. Chief Law Officer ', 'Legal'),
(718688355, 'Mr. SD Weerasingha', 'Foreign Training Co-or.', 'MPMA'),
(718688357, 'Capt. Sajeewa C.Wima', 'Deputy Harbour Master                          ', 'Galle'),
(718688358, 'Mr. K. G. Upali', 'Dep.Chief Security Manager (Actg.)-II     ', 'Security'),
(718688359, 'Mr. U. L. Anura Band', 'Snr. Manager (Peliyagoda) ', 'Logistics'),
(718688361, 'Duty Officer', '', 'Logistics'),
(718688362, 'jctcontrol@slpa.lk', 'Duty Planners', 'Ops'),
(718688363, 'Mr. L.P.S.Chandana', 'Dy. Chief Operations Mgr.(C/O) ', 'Ops'),
(718688364, 'Duty Officer III & I', 'Duty Team JCT', 'Ops'),
(718688365, 'Mr. K.A.K.N.W. Weera', 'RM', 'Trinco'),
(718688366, 'Mr. B.G.A.D.Nimalasi', 'Chief Sup.dt (Damage Claims & Insurance)      ', 'Ops'),
(718688369, 'Mr. T. Pahetharan', 'Supdt', 'KKS'),
(718688371, 'Mrs. G.N. Liyanage', 'Chief Finance Manager', 'Finance'),
(718688372, 'Mrs. M.M.P.M. Gunara', 'SMF (Rev/ PT/ ST/ S & N)          ', 'Finance'),
(718688380, 'Navy', '', 'Security'),
(718688381, 'Navy', '', 'Security'),
(718688384, 'Navy', '', 'Security'),
(718688385, 'Navy', '', 'Security'),
(718688386, ' Mr. G.V.T. Nanayakk', 'Chief Engineer(Marine)', 'Marine'),
(718688388, 'Rear Admiral Suresh ', 'Colombo Port PFSO', 'Security'),
(718688391, ' Mr. A.L.M Nowfer', 'Chief Engineer(Development)', 'Deve'),
(718688392, 'Mr. W. P. Devasurend', 'Works Mgr. (Civil)', 'Deve'),
(718688393, 'Mr. Romesh. Pathiwil', 'Chief Engineer  (C & D)', 'C & D'),
(718724914, 'Capt. R.A.A.M.U.B Ra', 'COD West', 'Security'),
(718741661, 'Mrs.G.Z.Miskin', 'Chief Manager (Logistics)', 'Logistics'),
(718741662, ' Mr. G. Kawya Indraj', 'Asst. Manager (Com.& PR.)', 'Media'),
(718741663, 'Mrs. S.H.S. Padmini', 'Chief Human Resorce Manager', 'HR'),
(718741664, 'Mrs. Nelum Anawaratn', 'Chief Manager (Administration) ', 'Secretariat'),
(718741666, 'Mr. Saman Perera', 'Snr. (OM) GP & PVQ', 'Ops'),
(718741668, ' Mr. P. Katapearachc', 'Operations Manager', 'Ops'),
(718741669, 'Miss. N.H.Indumathi ', 'Accountant (Galle)', 'Galle'),
(719998466, 'Capt. SBYMYL Wasanth', 'Snr. Dy HM', 'Navigation');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
