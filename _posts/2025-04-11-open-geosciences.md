---
title: 'Open Geosciences'
date: 2025-04-11
permalink: /posts/2025/04/open-geosciences/
categories: [Education]
tags: [Open source, Geology, Books, Software, Web-based Application, Integration, Interaction]
---

> **Note:**: This page has been updated and modified based on the work of Gosses et al [^1] to provide the most updated and relevant information. It will be updated regularly. If you encounter a broken link or would like to suggest any other links to add, please [let me know](/about/#contact-me). 

_____

# Open Books
- [Geospatial Data Science with Julia](https://juliaearth.github.io/geospatial-data-science-with-julia) - Introductory book on geospatial data science with the Julia programming language.
- [Geocomputation with Python](https://py.geocompx.org/) - A book on reproducible geographic data analysis with open source software.
- [Geocomputation with R](https://r.geocompx.org/) - A book on geographic data analysis, visualization and modeling.
- [Applied Geostatistics in Python: a Hands-on Guide with GeostatsPy](https://geostatsguy.github.io/GeostatsPyDemos_Book/intro.html) - This e-book provides an accessible, online version for Undergraduate Data Analytics and Geostatistics Courses, more [^2].
- [Applied Machine Learning in Python: A Hands-on Guide with Code](https://geostatsguy.github.io/MachineLearningDemos_Book/intro.html) - A chapter of e-book “Applied Machine Learning in Python: a Hands-on Guide with Code, more [^3].
- [QGIS in Mineral Exploration](https://qgis-in-mineral-exploration.readthedocs.io/en/latest/) - This manual examines QGIS and how QGIS for mapping and geoscientific tasks. 


# Software

## Seismic and Seismology
- [Auralib](https://github.com/whamlyn/auralib) – Python package to support investigation of geoscience problems including geophysics, rock physics, petrophysics, and data read/write in common formats.
- [Bruges](https://github.com/agile-geoscience/bruges/tree/master/bruges) – Various geophysical equations and tools.
- [Madagascar](https://ahay.org/wiki/Main_Page) – Multi-dimensional data processing suite.
- [MDIO](https://mdio.dev) – Open source chunked and compressed cloud storage for seismic data based on Zarr with fast seismic ingestion and export tools – [Docs](https://mdio-python.readthedocs.io), [Source](https://github.com/TGSAI/mdio-python).
- [ObsPy](https://github.com/obspy/obspy/wiki) – Framework for reading, writing and processing seismic and seismological data.
- [OpendTect-Plugins](https://github.com/waynegm/OpendTect-Plugins) – Open source plugins for the [OpendTect](#platforms) seismic interpretation platform. See [the docs](https://waynegm.github.io/OpendTect-Plugin-Docs) for more information.
- [OpenSeaSeis](https://github.com/JohnWStockwellJr/OpenSeaSeis) – Seismic workflow generator and seismic viewer.
- [Pastas](https://github.com/pastas/pastas) – Open-source Python framework for the analysis of groundwater time series.
- [Pyrocko](https://git.pyrocko.org/pyrocko/pyrocko) – Seismology toolkit.
- [pyVDS](https://github.com/equinor/pyvds) – Convenience wrapper around Bluware's OpenVDS+ Python bindings which enables reading of VDS files with a syntax familiar to users of segyio.
- [pyZGY](https://github.com/equinor/pyzgy) – Convenience wrapper around Schlumberger's OpenZGY Python package which enables reading of ZGY files with a syntax familiar to users of segyio.
- [RedPy](https://github.com/ahotovec/REDPy) – Auto-clustering for seismic events.
- [rsudp](https://github.com/raspishake/rsudp) – Continuous ObsPy-based visual display, sudden motion monitoring, and historical replay of Raspberry Shake data.
- [Segyio](https://github.com/equinor/segyio) – Fast library for seismic SEGY files.
- [SeisComp](https://github.com/SeisComP/seiscomp) – Seismic observatory automation toolkit. Autodetection, storage, sharing, processing data and more.
- [Seismic Un*x](https://github.com/JohnWStockwellJr/SeisUnix) – Seismic data processing suite.
- [SeismicZFP](https://github.com/equinor/seismic-zfp) – Convert SEG-Y/ZGY files to compressed SGZ files & retrieve arbitrary sub-volumes from these, fast.
- [synthoseis](https://github.com/sede-open/synthoseis) – Synthoseis is an open-source, Python-based tool used for generating pseudo-random seismic data.

## Ground-penetrating radar
- [gprMax](https://www.gprmax.com) – Finite-difference time-domain electromagnetic wave propagation simulator (on CPU and GPU).
- [GPRPy](https://github.com/NSGeophysics/GPRPy) – Multi-format, GUI-based GPR processing and visualization.
- [RAGU](https://github.com/btobers/RAGU) – Radar interpretation GUI compatible with multiple radar datasets.
- [readgssi](https://github.com/iannesbitt/readgssi) – Fast command line or console-based visualization, filtering, and translation of GSSI radar data.
- [RGPR](https://github.com/emanuelhuber/RGPR) – Reads, exports, processes, and plots ground-penetrating radar data.

## Well Log
- [dlisio](https://github.com/equinor/dlisio) – Parser for dlis and lis well log files.
- [lasio](https://github.com/kinverarity1/lasio) – Reading and writing well data using Log ASCII Standard (LAS) files.
- [OpenGeoPlotter](https://github.com/bsomps/OpenGeoPlotter) – Create strip logs, drill sections, other plots.
- [PetroPy](https://github.com/toddheitmann/PetroPy) – Petrophysics package for conventional and unconventional formation evaluation and includes basic well log visualization via matplotlib.
- [Striplog](https://github.com/agile-geoscience/striplog) – Display lithological and stratigraphic logs for wells and outcrop.
- [Wellioviz](https://github.com/JustinGOSSES/wellioviz) – Visualizes well logs using d3.js. Companion to Wellio.js.
- [Wellpathpy](https://github.com/Zabamund/wellpathpy) – Light package to load well deviations.
- [Welly](https://github.com/agile-geoscience/welly) – Analyzing and processing well log data.

## Simulation and Modelling
- [Basic Model Interface (BMI)](https://github.com/csdms/bmi) – A standardized set of functions for model-model and model-data coupling.
- [bh_tomo](https://github.com/groupeLIAMG/bh_tomo) – Borehole radar and seismic tomography package.
- [BlenderGeoModeller](https://github.com/bsomps/BlenderGeoModeller) – A Blender add-on with a collection of tools for 3-D geological modelling.
- [Devito](https://www.devitoproject.org) – Finite-Difference computation from high-level symbolic problem definitions.
- [disba](https://github.com/keurfonluu/disba) – Numba-accelerated computation of surface wave dispersion.
- [emsig](https://emsig.xyz) – Controlled-source electromagnetic modellers for layered and three-dimensional anisotropic media.
- [Fatiando a Terra](https://github.com/fatiando) – Modelling and inversion in geophysics.
- [GemPy](https://github.com/cgre-aachen/gempy) – 3-D structural geological modelling software with implicit modelling and support for stochastic modelling.
- [GeoPhyInv](https://github.com/pawbz/GeoPhyInv.jl) – Julia Toolbox for Geophysical Modeling and Inverse Problems.
- [HyVR](https://github.com/driftingtides/hyvr) – 3-D anisotropic subsurface models based on geological concepts that can be used with groundwater flow simulators (e.g., [ModFlow](#simulation-and-modelling)).
- [Landlab](https://github.com/landlab/landlab) – Simulate surface processes using a large suite of existing interoperable process components (landscape evolution, sediment dynamics, surface hydrology, ecohydrology), extensible by own modules.
- [LoopStructural](https://github.com/Loop3D/LoopStructural) – an open-source 3D structural geological modelling library.
- [modelr.io](https://github.com/agile-geoscience/modelr) – Web app for simple synthetic seismic forward modelling.
- [ModFlow](https://www.usgs.gov/software/modflow-6-usgs-modular-hydrologic-model) – Flow modelling software distributed by the USGS to simulate and predict groundwater conditions and groundwater/surface-water interactions with additional variants and add-ons.
- [OccamyPy](https://github.com/fpicetti/occamypy) – an object-oriented optimization framework for small- and large-scale problems.
- [PyFWI](https://pyfwi.readthedocs.io/en/latest) – It can be used to perform full-waveform inversion (FWI) and time-lapse FWI of seismic data.
- [pyGeoPressure](https://pygeopressure.readthedocs.io/en/latest) – Pore pressure prediction using well log data and seismic velocity data.
- [pyGIMLi](https://www.pygimli.org) – Multi-method library for solving inverse and forward tasks related to geophysical problems.
- [PyGMI](https://patrick-cole.github.io/pygmi/pygmi.html)– It is a modelling and interpretation suite aimed at magnetic, gravity and other datasets.
- [PyLops](https://pylops.readthedocs.io/en/latest) – Linear Operators with some geophysics/seismic modules (e.g., pre- and post-stack AVO inversion, deconvolution, Marchenko redatuming, Radon filtering).
- [PyMT](https://github.com/csdms/pymt) – Python toolkit for coupling models and datasets that expose the Basic Model Interface (BMI).
- [PySIT](https://pysit.org) – A Toolbox for seismic inversion and seismic imaging.
- [ResIPy](https://gitlab.com/hkex/resipy) – an intuitive open source software for complex geoelectrical inversion/modeling.
- [SimPEG](https://github.com/simpeg/simpeg) – Simulation and parameter estimation in geophysics.
- [ttcrpy](https://ttcrpy.readthedocs.io/en/latest) – Traveltime computation and raytracing on 2D & 3D rectilinear grids and unstructured meshes.
- [XTgeo](https://xtgeo.readthedocs.io/en/latest) – Python library with C backend to support manipulation of (oil industry) subsurface reservoir modelling.

## Reservoir Engineering
- [DuMu<sup>x</sup>](https://dumux.org) – Simulator for flow and transport processes in porous media.
- [DeepField](https://github.com/deepfield-team/DeepField) - A framework for reading and writing Eclipse reservoir data, reservoir preprocessing and interactive visualization.
- [ecl](https://github.com/equinor/ecl) – Reading and writing Eclipse reservoir simulator files.
- [Fesapi](https://github.com/F2I-Consulting/fesapi) – Reading and writing RESQML2 files.
- [libres](https://github.com/equinor/libres) – Tool for managing an ensemble of reservoir models.
- [MRST](https://www.sintef.no/projectweb/mrst) – Rapid prototyping and demonstration of new simulation methods in reservoir modelling and simulation.
- [ResInsight](https://github.com/OPM/ResInsight) – ResInsight is a powerful open source, cross-platform 3D visualization, curve plotting, and post processing tool for reservoir models and simulations.
- [SHEMAT-Suite](https://git.rwth-aachen.de/SHEMAT-Suite/SHEMAT-Suite-open) – Simulator for flow, heat and species transport in porous media including stochastic and deterministic parameter estimation.

## Geostatistics
- [GeostatsPy](https://github.com/GeostatsGuy/GeostatsPy) – GSLIB reimplemented in Python.
- [GeoStats.jl](https://github.com/JuliaEarth/GeoStats.jl) – High-performance geostatistics in Julia.
- [GeoStat-Framework](https://github.com/GeoStat-Framework) – Framework for geostatistical simulations.
- [gstat](https://github.com/r-spatial/gstat) – Geostatistical modelling, prediction and simulation.
- [gstlearn](https://gstlearn.org) – Complete cross-platform library and packages for Geostatistics proposed by MINES PARIS – PSL University.
- [G2S](https://gaia-unil.github.io/G2S) – A free, flexible and multi-language multiple point (MPS) (geo)statistics framework including the state-of-the-art algorithm QuickSampling.
- [HPGL](https://github.com/hpgl/hpgl) – High performance geostatistics library.
- [PyGSLIB](https://opengeostat.github.io/pygslib/index.html) – Mineral resource estimations.
- [Pyinterpolate](https://github.com/DataverseLabs/pyinterpolate) – Kriging, Poisson Kriging, Semivariogram Deconvolution, Areal Kriging and other spatial interpolation methods in Python for Earth, Ecology and Social Sciences.
- [pyKriging](https://github.com/capaulson/pyKriging) – N-dimensional kriging.
- [pysgems](https://github.com/robinthibaut/pysgems) – Use SGeMS (Stanford geostatistical modelling software) within Python.
- [SciKit-GStat](https://github.com/mmaelicke/scikit-gstat) – SciPy-styled analysis module for geostatistics.
- [SGeMS](https://sgems.sourceforge.net) – Stanford geostatistical modelling software.
- [bm_geostat_process](https://github.com/pemn/bm_geostat_process) - open source workflow for geostatistics block models.

## Geospatial
- [Generic Mapping Tools (GMT)](https://www.generic-mapping-tools.org) – About 80 command-line tools for manipulating geographic and Cartesian data sets.
- [geonotebook](https://github.com/OpenGeoscience/geonotebook) – Jupyter notebook extension for geospatial visualization and analysis developed by NASA.
- [GeoPHP](https://geophp.net) – Geospatial library that works with many formats.
- [GRASS-GIS](#platforms) – GIS platform, see [Platforms](#platforms).
- [QGIS](#platforms) – GIS platform, see [Platforms](#platforms).
- [Stress2Grid](https://dataservices.gfz-potsdam.de/wsm/showshort.php?id=escidoc:2112906) – Two concepts to calculate the mean SHmax orientation.
- [Verde](https://github.com/fatiando/verde) – processing spatial data to regular grids.
- [vtk_triangulate_points](https://github.com/pemn/vtk_triangulate_points) – Generate simplified topography surfaces from dense point clouds (lidar/radar/drone).
- [whitebox-tools](https://github.com/jblindsay/whitebox-tools) – An advanced geospatial data analysis platform.
- [gemgis](https://github.com/cgre-aachen/gemgis) – Spatial data processing for geomodeling.
- [SamGIS](https://github.com/trincadev/samgis-be) – Image Segmentation machine learning based applied to GIS and geo data. HuggingFace demo [here](https://huggingface.co/spaces/aletrn/samgis).

## Geochemistry
- [GeoPyTool](https://github.com/GeoPyTool/GeoPyTool) – Application with geochemical plotting capabilities.
- [PhreeQC](https://www.usgs.gov/software/phreeqc-version-3) – Reactions in water and between water and rocks and sediments (speciation, batch-reaction, one-dimensional transport, and inverse geochemical calculations).
- [pyrolite](https://github.com/morganjwilliams/pyrolite) – Geochemical transformation and visualisation.
- [Reaktoro](https://reaktoro.org) – Unified framework for modelling chemically reactive systems.
- [Thermobar](https://github.com/PennyWieser/Thermobar) – Thermobarometry, chemometry and mineral equilibrium tool.
- [CHNOSZ](https://www.chnosz.net/) – Thermodynamic calculations and diagrams for geochemistry.
- [GeoChemical Data toolkit – GCDKit](https://gcdkit.org/) – System for handling and recalculation of whole-rock analyses from igneous rocks.

## Geodynamics
- [Underworld](https://github.com/underworldcode/underworld2) - Computational tools for the geodynamics community.

## Magnetotellurics
- [MATE](https://github.com/sinanozaydin/MATE) - A Python program for interpreting magnetotelluric models of the mantle.
- [MTPy](https://github.com/MTgeophysics/mtpy) - A Python Toolbox for magnetotelluric data processing, analysis, modelling and visualization.
- [Razorback](https://github.com/brgm/razorback) – An Python library for magnetotelluric robust processing.

## Structural Geology
- [apsg](https://github.com/ondrolexa/apsg) – Advanced structural geology analysis and visualisation based on Matplotlib.
- [mplStereonet](https://github.com/joferkington/mplstereonet) – Stereonets on python based on Matplotlib.
- [OpenStereo](https://github.com/spamlab-iee/os) – An open source, cross-platform structural geology analysis software.
- [Stress_state_plot](https://github.com/mkondratyev85/stress_state_plot) – An open source structural geology package for visualisation of a given stress-state.

## Visualization
- [cmocean](https://matplotlib.org/cmocean) – MatPlotLib collection of perceptual colormaps for oceanography.
- [Colorcet](https://github.com/holoviz/colorcet)  – Perceptual colormaps.
- [Geologic Patterns](https://github.com/davenquinn/geologic-patterns) – Entire FGDC pattern library extracted to SVG and PNG for use in geologic maps and stratigraphic columns.
- [ipyleaflet](https://github.com/jupyter-widgets/ipyleaflet) – 2D interactive maps and GIS visualization in the Jupyter Notebook.
- [localtileserver](https://github.com/banesullivan/localtileserver) – A Python package for serving tiles from large raster files in the Slippy Maps standard (i.e., `/zoom/x/y.png`) for visualization in Jupyter with `ipyleaflet` or `folium`.
- [omfvista](https://github.com/OpenGeoVis/omfvista) – PyVista interface for the [Open Mining Format (omf)](#miscellaneous) package.
- [PyVista](https://github.com/pyvista/pyvista) – 3D plotting and mesh analysis through a streamlined interface for the Visualization Toolkit (VTK).
- [PVGeo](https://github.com/OpenGeoVis/PVGeo) – Data and model visualization in ParaView and Visualization Toolkit (VTK) via PyVista.
- [GeoVista](https://github.com/bjlittle/geovista) – Cartographic rendering and mesh analytics powered by PyVista.
- [Digitize Heatmap](https://github.com/RyanFu008/digitize-heatmap) – Get numerical data from a heatmap from a PDF format.

## Platforms
- [GRASS-GIS](https://grass.osgeo.org) – GIS platform for vector and raster geospatial data management, geoprocessing, spatial modelling and visualization, source code available at [github](https://github.com/OSGeo/grass).
- [OpendTect](https://dgbes.com/software/opendtect) – Seismic interpretation package, source code available at [github](https://github.com/OpendTect/OpendTect).
- [OpenGeode](https://github.com/Geode-solutions/OpenGeode) – Representation and manipulation of geological models.
- [Pangeo](https://pangeo.io) – A community platform for Big Data geoscience built on top of the open source scientific python ecosystem.
- [QGIS](https://qgis.org/en/site) – GIS platform to visualize, manage, edit, analyse data, and compose printable maps.
- [Webviz](https://github.com/equinor/webviz-config) – Webviz is a wrapper on top of Dash from Plotly which encourages making reusable data visualisation components and dashboards.
- [Webviz-subsurface](https://github.com/equinor/webviz-subsurface) – Webviz-subsurface contains subsurface specific standard webviz containers, which are used as plugins in webviz-config.

## Natural Language Processing
- [geoVec](https://osf.io/4uyeq/wiki/home) – "Word embeddings for application in geosciences: development, evaluation and examples of soil-related concepts" and an [implementation](https://github.com/JustinGOSSES/geoVec-playground).

## Geochronology
- [IsoplotR](https://github.com/pvermees/IsoplotR) – A free and open-source substitute for Kenneth Ludwig's popular _Isoplot_ add-in to Microsoft Excel.
- [pychron](https://github.com/NMGRL/pychron) – Data acquisition and processing framework for Ar-Ar geochronology and noble gas mass spectrometry.



## Data Repositories
- [Athabasca Oil Sands Well Dataset McMurray/Wabiskaw](https://ags.aer.ca/publication/spe-006) – Well logs and stratigraphic picks for 2193 wells, including 750 with lithofacies, from Alberta, Canada.
- [Digital Rocks Portal](https://www.digitalrocksportal.org) – Powerful data portal for images of varied porous micro-structures.
- [Geoscience Australia Portal](https://portal.ga.gov.au) – Comprehensive map-based Australian data portal across multiple geoscience domains.
- [GSQ Open Data Portal](https://geoscience.data.qld.gov.au/) – Petroleum, coal, and mineral geoscience data from the Queensland resource industry and government, with supporting information from [GSQ GitHub Repository](https://github.com/geological-survey-of-queensland) for Data Models, RDF Vocabularies, and system design. Use of VPN may result in 403 error.
- [ICGEM](https://icgem.gfz-potsdam.de/home) – Hosts gravity field spherical harmonic models and provides a webservice for generating grids of gravity functionals (geoid, gravity anomaly, vertical derivatives, etc).
- [NOPIMS](https://www.ga.gov.au/nopims) – Open petroleum geoscience data from Western Australia made available by the Australian Government.
- [Poseidon NW Australia](https://drive.google.com/drive/folders/0B7brcf-eGK8Cbk9ueHA0QUU4Zjg) – Interpreted 3D seismic (32bit) including reports and well logs.
- [Quantarctica](https://www.npolar.no/quantarctica) – User-configurable [QGIS](#platforms) basemap for Antarctica with high-quality, peer-reviewed, free and open Antarctic scientific data.
- [SARIG](https://map.sarig.sa.gov.au) – South Australian Resources and Information Gateway providing map-based statewide geoscientific and geospatial data with over 600 datasets.
- [SEG Open Data Catalog](https://wiki.seg.org/wiki/Open_data) – Catalog of "geophysical data that is readily available for download from the internet, via mail, or through special request", maintained by the Society of Exploration Geophysicists.
- [TerraNubis](https://terranubis.com/datalist/free) – The new _Open Seismic Repository_, includes the classic F3 and Penobscot seismic volumes (which both also have wells and other data assets).
- [UK National Data Repository](https://ndr.ogauthority.co.uk) – Open petroleum geoscience data from the UK Government (free registration required).
- [Volve data village](https://www.equinor.com/energy/volve-data-sharing) - A complete set of data from a North Sea oil field available for research, study and development purposes.
- [World Stress Map](https://www.world-stress-map.org) – A global compilation of information on the crustal present-day stress field.
- [Macrostrat](https://macrostrat.org) - A multiscale, harmonized, and globally-defined geologic map dataset and stratigraphic API.
- [Costa Model](https://researchportal.hw.ac.uk/en/datasets/costa-model-hierarchical-carbonate-reservoir-benchmarking-case-st/) – A hierarchical carbonate reservoir benchmarking case study.
- [EarthChem](https://www.earthchem.org/) – Community-driven preservation, discovery, access, and visualization of geochemical, geochronological, and petrological data.


## Tutorials and Cheat Sheets

- [Basic Geoscience Cheat Sheet](https://static.squarespace.com/static/549dcda5e4b0a47d0ae1db1e/54a06d6ee4b0d158ed95f696/54a06d6fe4b0d158ed95fff0/1295033898443/Cheatsheet_basic.pdf) – Cheat Sheet for Basic Geoscience.
- [Geophysics Cheat Sheet](https://static.squarespace.com/static/549dcda5e4b0a47d0ae1db1e/54a06d6ee4b0d158ed95f696/54a06d70e4b0d158ed9603f5/1350658645407/Cheatsheet_geophysics.pdf) – Cheat Sheet for Geophysics.
- [Petroleum Science Cheat Sheet](https://static.squarespace.com/static/549dcda5e4b0a47d0ae1db1e/54a06d6ee4b0d158ed95f696/54a06d6fe4b0d158ed96019e/1323808738753/Cheatsheet_petroleum.pdf) – Cheat Sheet for Petroleum Science.
- [Rock Physics Cheat Sheet](https://static.squarespace.com/static/549dcda5e4b0a47d0ae1db1e/54a06d6ee4b0d158ed95f696/54a06d6fe4b0d158ed960042/1374593568367/Cheatsheet_Rock_Physics.pdf) – Cheat Sheet for Rock Physics.
- [Project Pythia](https://projectpythia.org/) – An education and training hub for the geoscientific Python community.



## Miscellaneous

- [gio](https://github.com/agile-geoscience/gio) – Geoscience file input and output functions for less-than standard data formats.
- [Open Mining Format](https://omf.readthedocs.io/en/latest) – Versatile mining data standard.
- [Software Underground Slack](https://softwareunderground.org) – Community connecting geo\computing researchers.
- **Research Labs**: [Automated Mineralogy Lab at CPG](https://aml.qubalee.com)
- **Research Tools**: [Citation Reports](https://jcr.clarivate.com/jcr/browse-journals) • [Citation Finder](https://citation-finder.vercel.app/) • [iThenticate](https://library-web.kfupm.edu.sa/other-resources/user-guides/ithenticate-user-guide/) • [Eye on the Earth](https://eyes.nasa.gov/apps/earth/#/) • [Earthviewer](https://media.hhmi.org/biointeractive/earthviewer_web/earthviewer.html) • [OneGeology](https://portal.onegeology.org/OnegeologyGlobal/) • [GeoArabia](https://pubs.geoscienceworld.org/geoarabia/list-of-years) • [CCS Map](https://www.sccs.org.uk/resources/global-ccs-map)
- **Research Data**: [USGS ADR](https://www.usgs.gov/office-of-science-quality-and-integrity/acceptable-digital-repositories-usgs-scientific) • [SGS NGD](https://ngdp.sgs.gov.sa/ngp/) • [NASA Datasets](https://data.giss.nasa.gov/). Also, check [Data Repositories](#data-repositories)
- **Learning Resources**: [Data Sci Python](https://www.youtube.com/playlist?list=PLG19vXLQHvSDy26fM3hDLg3VCU7U5BGZl) • [Data Analytics](https://www.youtube.com/playlist?list=PLG19vXLQHvSB-D4XKYieEku9GQMQyAzjJ) • [Rocks: Interactive workshop](https://podcast-prod-distribution.s3.eu-west-2.amazonaws.com/oaipmh-default/ee54d805-482d-4053-ae38-aa9f915f7ae5/bb261954-9338-4e12-9a40-d50df952db7e/rocks.mp4) • [GeoBus](https://www.youtube.com/@geobusstandrews/videos) • [Online interactive petrology course](https://viva.pressbooks.pub/petrology/) • [Virtual Microscope](https://virtualmicroscope.org/collections) • [Outcropedia](https://outcropedia.tectask.org/) • [eRocK](https://www.e-rock.co.uk/) • [360-Degree Geologic Expedition](https://www.sciencefriday.com/educational-resources/360-degree-expedition/) • [Geo 3D Models](https://v3geo.com/search) • [Carbonateworld](https://carbonateworld.com/)

## Related

- [Awesome-Spatial](https://github.com/RoboDonut/awesome-spatial) – Awesome list for geospatial, not specific to geoscience but significant overlap
- [Awesome Open Climate Science](https://github.com/pangeo-data/awesome-open-climate-science) – Awesome list for atmospheric, ocean, climate, and hydrologic science
- [Awesome Coastal](https://github.com/chrisleaman/awesome-coastal) – Awesome list for coastal engineers and scientists
- [Awesome Earth Artificial Intelligence](https://github.com/ESIPFed/Awesome-Earth-Artificial-Intelligence) – Awesome list for artificial intelligence use cases in Earth Science maintained by ESIP (<a href="https://wiki.esipfed.org/Main_Page">Earth Science Information Partners</a>, which is an Earth science informatics community) Machine Learning Cluster.
- [Awesome Open Geoscience](https://github.com/softwareunderground/awesome-open-geoscience) – Curated from repositories that make our lives as geoscientists, hackers, and data wranglers easier or just more awesome

## Cite this page
If you found this post helpful, please consider citing it:

> Alqubalee, A. (2025, April 11). Open Geosciences. [https://qubalee.com/posts/2025/04/open-geosciences/](https://qubalee.com/posts/2025/04/open-geosciences)
{: .prompt-info } 


## References

[^1]: Justin Gosses, Jesper Dramsch, Evan Bianco, Dieter Werthmüller, Andrew Moodie, Bane Sullivan, Matteo Niccoli, Leonardo Uieda, eMHa, Antoine Caté, Ian Nesbitt, Arnaud Botella, David Wade, Mathieu Gravey, Matt Hall, Sebastian Müller, Per Olav Eide Svendsen, Rodolfo Oliveira, Rowan Cockett, … Fernando E. Ziegler. (2023). softwareunderground/awesome-open-geoscience: Alpha release to test integration with Zenodo (Alpha). Zenodo. https://doi.org/10.5281/zenodo.8354180
[^2]: Michael Pyrcz. (2024). GeostatsGuy/GeostatsPyDemos: GeostatsPyDemos 0.0.1 (GeostatsPyDemos0.0.1). Zenodo. https://doi.org/10.5281/zenodo.12667036
[^3]: Michael Pyrcz. (2025). GeostatsGuy/MachineLearningDemos_Book: v0.2 (v0.2). Zenodo. https://doi.org/10.5281/zenodo.15169139
