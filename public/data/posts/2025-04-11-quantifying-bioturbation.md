---
title: "Impact of Sample Size on Quantifying Bioturbation in Burrow-Related Strata"
date: 2025-04-11
permalink: /posts/2025/04/quantifying-bioturbation/
authors: [Abdullah Alqubalee]
author_urls: [https://qubalee.com/]
categories: [Research]
tags: [Burrows, Burrow intensity, Burrow connectivity, Quantification, Thalassinoides, Size, Workflow]
image:
  path: /assets/images_posts/thalassinoides.png
  alt: Burrow-bearing Core Samples with Multiple Diameters, 4, 6, 8, and 10 in (Cover Image)
---


Burrowed strata can hold a substantial reserve of water and hydrocarbon. However, estimating the permeability of such strata using routine core analysis is constrained by many challenges, such as selecting the appropriate sample size that could represent the burrow connectivity (BC) and burrow intensity (BI). Permeability of burrowed strata with passive filling depends heavily on these two variables. This study investigates the appropriate sample size that best represents the BI and BC of burrowed strata (*Thalassinoides*) by integrating 1) Coring, 2) X-ray Computed Tomography (CT) instruments, 3) ImageJ-Fiji, and 4) 3D Slicer open-source software, and 5) water flooding experiments. The results from the studied samples showed that the BI values of the cores with ≥ 7 cm diameters are slightly lower than those of < 7 cm diameter cores while the BC—indicated by the large connected burrow volume data—of the formers (≥ 95% of the burrow volume) is much higher than the BC of the latter (66% to 83% of the burrow volume). Water flooding experiments indicated that the bulk permeability values are very low with < 9.45-cm core diameter, but they become consistent and relatively higher with ≥ 9.45-cm core diameters. These results are consistent with the BC values calculated from the same cores. Selecting a representative sample size while evaluating the BI and BC for petrophysical modeling would eventually enhance the models toward accuracy and certainty.

## Introduction
Burrows are incorporated into reservoir studies to interpret sedimentologic and stratigraphic information and to evaluate the reservoir quality of burrow-related strata [^1]. Burrow intensity (BI) and connectivity (BC) are among several factors controlling petrophysical properties in burrowed strata. For this study, we conducted an integrated study to investigate the impact of sample size variation on the quantification of burrows and caverns. This study utilized several core samples from the Upper Jurassic Hanifa Formation in Saudi Arabia [^1], which were CT-scanned and processed via ImageJ-Fiji and 3D Slicer.

## Methods
The designed workflow started by taking several core samples from the Upper Jurassic Hanifa Formation at Jabal Al-Abakkayn, near Riyadh, Saudi Arabia. The samples were CT scanned using a Toshiba Alexion TSX-032A with a resolution of 1 mm. The CT scan data of each core sample was imported into Fiji v1.53e, and the brightness and contrast were automatically adjusted. The 2D slices were stacked as a tiff file, and the burrow segmentation was performed in the TWS [^2].

## Results and discussion
Based on the coefficient of variations (CV) of the burrow area of 234 2D slices, the burrow area is highly variable in the small diameters and less variable in 7.62 cm diameter and larger sizes. The arithmetic (mA), geometric (mG), and harmonic (mH) Pythagorean means were calculated to understand what averaging method is comparable with the actual BI. The burrow volume of the 9.65-cm core of the 7.62 cm and larger diameters is almost consistent with a BI value of 15.97%, SD of 0.64%, and CV = 4%. However, the BI of the other small diameters is 18.10%. The Largest Connected Burrow Volume (LCBV) values vary with multiple diameters, and the larger the diameter, the better the representation of the LCBV (Figure 1). The LCBV values of burrows with a diameter of 7 cm range from 69.95% to 82.90% of the burrow volume. The water flooding experiments results show that the average fluid permeability values are higher and more consistent in the core samples with a 9.45-cm core diameter than in the core samples with a 3.79-cm core diameter.
The BI and BC are important parameters for petrophysical evaluation, but the most frequently used approaches for evaluating the BI are mainly through limited 2D views (i.e., thin sections, slabbed cores, and outcrop faces). Furthermore, the size of the sample plays an important role in the quantification of the BI and BC. The burrow area varies vertically and laterally, and the variation decreases with increasing size of the samples. The burrow area mA and burrow volume mA are almost the same, but the mG and mH are flattened at larger core diameters. The results of this study indicate that the bulk permeability and burrow intrusion permeability are controlled by the sample size. The size of investigated samples for the BI and BC is important while conducting laboratory measurements for modeling petrophysical properties in the burrow-related strata.

<figure style="text-align: center;">
    <img src="/assets/images_posts/Segmented-burrows.png" alt="Figure 1: The CT scan segmented data of 4’ core sample showing the total volume, burrow volume and the connected volume of burrows" style="width: 100%;">
    <figcaption>Figure 1: The CT scan segmented data of 4’ core sample showing the total volume, burrow volume and the connected volume of burrows.</figcaption>
</figure>

## Conclusion
To investigate the impacts of sample size on burrow quantification, several core samples from intensively burrowed strata (*Thalassinoides*-dominated) of the Hanifa Formation, Saudi Arabia, were used. The results suggested that burrows with core diameters <unk> 7.62 cm have higher variability than those with core diameters > 7 cm.

## Further Reading
Read more about this topic in our previous work on [Bioturbation Impact on Reservoir and Aquifer Properties](/posts/2025/04/bioturbation/)



## References

[^1]: Eltom, H.A., Alqubalee, A.M.: Quantitative Variability oof Burrow Percentage Es-timated From 2D Views: Example From *Thalassinoides*-Bearing Strata, Central Saudi Arabia. Palaios. 37, 35–43 (2022). https://doi.org/10.2110/palo.2021.012

[^2]: Eltom, H.A., Alqubalee, A., Sultan, A., Barri, A., Abdelbasit, K.: Understanding the permeability of burrow-related gas reservoirs through integrated laboratory techniques. J. Nat. Gas Sci. Eng. 90, 103917 (2021). https://doi.org/10.1016/j.jngse.2021.103917
