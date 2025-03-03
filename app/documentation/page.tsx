import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function DocumentationPage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <h1 className="text-3xl font-bold mb-6 text-green-800 dark:text-green-400">
                Sustainability Assessment Framework
            </h1>
            <p className="text-lg mb-8 text-gray-700 dark:text-gray-300">
                Research, Models, and Case Studies for Global Sustainability Frameworks
            </p>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4 text-green-700 dark:text-green-500">
                    Global Sustainability Frameworks
                </h2>

                <div className="mb-6 bg-green-50 dark:bg-gray-800 p-6 rounded-lg">
                    <div className="flex flex-col md:flex-row gap-6 items-center mb-4">
                        <p className="text-gray-700 dark:text-gray-300">
                            The United Nations&apos; 17 Sustainable Development Goals provide a holistic framework for global sustainability efforts.
                            Adopted in 2015 as part of the UN&apos;s 2030 Agenda, the SDGs define 17 goals and 169 targets as a &quot;shared blueprint for
                            peace and prosperity for people and the planet, now and into the future&quot;. The SDGs call for worldwide action to end
                            poverty and improve health, education, and equality while tackling climate change and preserving oceans and forests.
                        </p>
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        IPCC Climate Reports complement these goals by assessing climate change risks and guiding global response.
                        The IPCC&apos;s assessments use a risk framework where climate-related risk emerges from the interaction of hazards
                        (e.g. extreme weather), exposure (people and assets in harm&apos;s way), and vulnerability (susceptibility to damage).
                        This framing helps quantify climate risks and inform adaptation strategies in line with sustainable development.
                    </p>

                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Green building standards like LEED (Leadership in Energy and Environmental Design) translate broad goals into
                        practical criteria for buildings. LEED is a certification system with key categories (e.g. Sustainable Sites,
                        Water Efficiency, Energy & Atmosphere, Materials & Resources, Indoor Environmental Quality) in which projects
                        earn points for meeting sustainable design benchmarks. A building must score at least 40 points to be LEED-certified,
                        with higher tiers (Silver, Gold, Platinum) for more points.
                    </p>

                    <p className="text-gray-700 dark:text-gray-300">
                        At the organizational level, ISO 14001 Environmental Management Systems (EMS) provide a structured framework for
                        continual environmental improvement. ISO 14001 is an international standard that uses a Plan-Do-Check-Act cycle:
                        organizations commit to an environmental policy, plan objectives and targets, implement changes, check performance,
                        and then review and adjust plans in a repeating cycle. This EMS framework drives continuous improvement in compliance,
                        pollution prevention, and resource efficiency. Together, these global frameworks (UN SDGs, IPCC risk assessments,
                        green building standards, and ISO EMS) supply the high-level principles, targets, and management systems that ground
                        a comprehensive sustainability assessment.
                    </p>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4 text-green-700 dark:text-green-500">
                    Mathematical Models & Formulas
                </h2>

                <div className="mb-8">
                    <h3 className="text-xl font-medium mb-3 text-green-600 dark:text-green-400">
                        Risk Analysis Models for Hazards and Pollution
                    </h3>
                    <div className="bg-green-50 dark:bg-gray-800 p-6 rounded-lg">
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Quantitative models are essential for evaluating environmental risks such as floods, earthquakes, pollution,
                            and biodiversity threats. A common formula expresses risk as a product of likelihood and impact: for example,
                            <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 mx-1 rounded">Risk = Probability × Consequence</span>,
                            meaning the chance of an event times the severity of its outcome.
                        </p>

                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            In disaster risk assessment, this concept is often expanded to account for hazard, exposure, and vulnerability.
                            For instance, climate and disaster researchers define
                            <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 mx-1 rounded">Risk = Hazard × (Exposure × Vulnerability)</span>.
                            Here hazard is the potential event (flood, quake, etc.), exposure is the people or assets in harm&apos;s way, and
                            vulnerability is their susceptibility to damage (e.g. building fragility or community preparedness).
                        </p>

                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            This multiplicative risk model is endorsed by IPCC and others as a way to identify how reducing exposure or
                            vulnerability can lower overall risk. In seismic risk modeling, for example, a region&apos;s risk is &quot;determined by
                            the combination of hazard, vulnerability and exposure,&quot; which together estimate expected damage over a given time frame.
                        </p>

                        <p className="text-gray-700 dark:text-gray-300">
                            For pollution and health risk, environmental agencies use dose-response models and hazard quotients. The U.S. EPA&apos;s
                            risk assessment guidelines calculate a Risk Quotient (RQ) by comparing exposure to a toxin against its safe threshold:
                            <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 mx-1 rounded">RQ = Exposure / Toxicity</span>,
                            where an RQ above 1 indicates a potential concern. This formulaic approach helps screen for high-risk pollution
                            scenarios (e.g. if pollutant concentrations exceed what organisms or humans can safely tolerate).
                        </p>
                    </div>
                </div>

                <div className="mb-8">
                    <h3 className="text-xl font-medium mb-3 text-green-600 dark:text-green-400">
                        Sustainability Scoring Formulas
                    </h3>
                    <div className="bg-green-50 dark:bg-gray-800 p-6 rounded-lg">
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            To evaluate overall sustainability performance, composite scoring models and indices are widely used. Sustainability
                            indices aggregate multiple indicators (environmental, social, economic) into a single score to facilitate comparison
                            or tracking over time. Research shows that well-chosen sustainability indicators and composite indices are &quot;useful
                            tools for policy making and public communication,&quot; simplifying complex data and highlighting trends.
                        </p>

                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            A typical approach is to normalize each indicator, apply weights, and sum or average them to yield a score. For example,
                            the UN SDG Index is computed by first scoring each of the 17 SDGs (averaging that goal&apos;s indicators) and then taking an
                            average of all goal scores. This gives each country an index score on a 0–100 scale indicating its overall progress
                            toward the SDGs.
                        </p>

                        <p className="text-gray-700 dark:text-gray-300">
                            Another example is the Environmental Performance Index (EPI), which combines 40 environmental indicators into 11 issue
                            categories (e.g. air quality, water, biodiversity) and then into two high-level objectives (environmental health and
                            ecosystem vitality). Countries are scored based on proximity-to-target for each indicator, enabling comparisons and
                            ranking on a 0–100 scale.
                        </p>
                    </div>
                </div>

                <div>
                    <h3 className="text-xl font-medium mb-3 text-green-600 dark:text-green-400">
                        Feasibility Assessment Models for Sustainable Projects
                    </h3>
                    <div className="bg-green-50 dark:bg-gray-800 p-6 rounded-lg">
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Assessing the feasibility of sustainable projects involves extending traditional project evaluation models to include
                            environmental and social criteria. Classic feasibility studies examine technical viability, cost-benefit analysis, and
                            return on investment. Sustainable feasibility models build on this by incorporating the &quot;triple bottom line&quot; of economic,
                            environmental, and social performance.
                        </p>

                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            For example, researchers have proposed conceptual models where project feasibility is judged not only on financial metrics
                            but also on criteria like greenhouse gas reduction, community benefits, and regulatory compliance. One such model integrated
                            sustainability considerations into the early feasibility phase for construction projects, adding environmental and social
                            performance indicators alongside cost and time criteria.
                        </p>

                        <p className="text-gray-700 dark:text-gray-300">
                            By evaluating these factors together, decision-makers can identify trade-offs (e.g. a design with higher upfront cost but
                            much lower carbon footprint) and overall project viability in sustainability terms. Risk assessment is also folded into
                            feasibility for sustainable projects – e.g. analyzing climate risks that could impact a project&apos;s long-term success
                            (such as flood risk for infrastructure).
                        </p>
                    </div>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4 text-green-700 dark:text-green-500">
                    Scientific Research & Case Studies
                </h2>

                <div className="mb-8">
                    <h3 className="text-xl font-medium mb-3 text-green-600 dark:text-green-400">
                        Sustainability Measurement Methodologies
                    </h3>
                    <div className="bg-green-50 dark:bg-gray-800 p-6 rounded-lg">
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            A growing body of scientific research focuses on how to measure and quantify sustainability. Studies and review papers
                            have compiled numerous sustainability metrics and methods, comparing their effectiveness. For instance, Singh et al. (2009)
                            provide an overview of sustainability assessment methodologies, highlighting how various indices are formulated through
                            indicator selection, normalization, weighting, and aggregation.
                        </p>

                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Methodologies like Life Cycle Sustainability Assessment (LCSA) extend traditional life cycle analysis by evaluating
                            environmental, economic, and social impacts together – this has been discussed in literature as a comprehensive way to
                            gauge product or project sustainability.
                        </p>

                        <p className="text-gray-700 dark:text-gray-300">
                            Another stream of research looks at enterprise sustainability assessments and ESG (Environmental, Social, Governance)
                            scoring, reviewing methods to rate corporate sustainability performance. Common themes in the literature include the need
                            for robust indicators, transparent scoring formulas, and addressing uncertainty in measurements.
                        </p>
                    </div>
                </div>

                <div>
                    <h3 className="text-xl font-medium mb-3 text-green-600 dark:text-green-400">
                        Case Studies of Sustainability Evaluations
                    </h3>
                    <div className="bg-green-50 dark:bg-gray-800 p-6 rounded-lg">
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Real-world case studies illustrate how sustainability assessment frameworks are applied in practice. In the building sector,
                            for example, comparative studies have evaluated how different green building rating systems perform on the same project.
                            One case study analyzed a building using LEED, BREEAM, and CASBEE criteria side by side, revealing how each framework
                            scores aspects of sustainability (energy use, materials, indoor environment) and highlighting their differences.
                        </p>

                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Other case studies focus on project-level evaluations: A study of multiple high-rise buildings constructed with sustainable
                            timber assessed each building across environmental, social, and economic dimensions. The findings showed that no single
                            building outperformed in all sustainability categories; each had unique strengths, underscoring the multi-dimensional
                            nature of sustainability trade-offs.
                        </p>

                        <p className="text-gray-700 dark:text-gray-300">
                            In infrastructure and urban planning, case studies often document sustainability appraisal of projects like transportation
                            systems or flood management initiatives. For instance, a post-project sustainability evaluation might use a complex systems
                            approach to see if an implemented project (say, a transit system) delivered expected benefits in reduced emissions, improved
                            mobility, and community wellbeing.
                        </p>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4 text-green-700 dark:text-green-500">
                    Integration with API Data
                </h2>

                <div className="mb-8">
                    <h3 className="text-xl font-medium mb-3 text-green-600 dark:text-green-400">
                        Structuring API Data for Sustainability Models
                    </h3>
                    <div className="bg-green-50 dark:bg-gray-800 p-6 rounded-lg">
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Modern sustainability assessments increasingly rely on live or granular data from various sources, often accessed via APIs.
                            Best practices for structuring API data ensure that this information can be seamlessly integrated into scoring models.
                            One key practice is adopting standardized data formats and schemas across sources.
                        </p>

                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Because different environmental APIs (for weather, air quality, water, etc.) may have their own data structures, aligning
                            them to a common format (e.g. using consistent units, timestamps, and field names) greatly simplifies integration.
                            Organizations and standards bodies are working on open data standards for environmental information to facilitate this
                            compatibility.
                        </p>

                        <p className="text-gray-700 dark:text-gray-300">
                            It&apos;s also recommended to perform data cleaning and validation when pulling API data. This includes checking for missing
                            values, outliers, and ensuring data quality before it feeds into the sustainability score calculations. Techniques like
                            normalization (to scale different data to comparable ranges) and real-time error checking help maintain accuracy.
                        </p>
                    </div>
                </div>

                <div className="mb-8">
                    <h3 className="text-xl font-medium mb-3 text-green-600 dark:text-green-400">
                        Calculating Sustainability Indices with Environmental Data
                    </h3>
                    <div className="bg-green-50 dark:bg-gray-800 p-6 rounded-lg">
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            With a solid data structure in place, the next step is to compute sustainability indices using the API-fed data. Typically,
                            raw environmental data (e.g. temperature trends, rainfall, pollutant concentrations, deforestation rates) are converted
                            into specific indicators that the scoring model requires.
                        </p>

                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            For instance, an API providing daily air quality might output concentrations of PM2.5 or NO₂; the sustainability model
                            might translate these into an Air Quality Index or compare them to WHO guideline levels to score air pollution. Best
                            practices here include using proximity-to-target calculations – measuring how close the current data is to a defined
                            sustainability target or threshold.
                        </p>

                        <p className="text-gray-700 dark:text-gray-300">
                            This approach is used in indices like the EPI and SDG Index, where each metric&apos;s score is 100 when the target is met and
                            0 at a worst-case benchmark. Automating these calculations ensures the index updates as new data arrives. For example,
                            if a sustainability API provides real-time energy mix data (what percent of electricity is renewable), the framework could
                            continuously update a clean energy indicator and overall score based on that feed.
                        </p>
                    </div>
                </div>

                <div>
                    <h3 className="text-xl font-medium mb-3 text-green-600 dark:text-green-400">
                        APIs for Sustainability Assessment
                    </h3>
                    <div className="bg-green-50 dark:bg-gray-800 p-6 rounded-lg">
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Integrating data from various APIs is essential for comprehensive sustainability assessment.
                            These APIs provide real-time and historical data across multiple sustainability domains.
                        </p>

                        <div className="mb-6">
                            <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">Climate & Weather Data</h4>
                            <p className="text-gray-700 dark:text-gray-300 mb-2">
                                Required for climate risk modeling, feasibility assessment, and sustainability scoring.
                            </p>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white dark:bg-gray-700 rounded-lg overflow-hidden">
                                    <thead className="bg-green-100 dark:bg-gray-600">
                                        <tr>
                                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">API Name</th>
                                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">Data Provided</th>
                                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">Source</th>
                                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">Usage</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                                        <tr>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">NOAA Climate Data API</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">Historical and real-time climate data (temperature, rainfall, sea levels, extreme events)</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">NOAA (U.S.)</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">Assess climate risk (flood, drought, hurricanes)</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">NASA POWER API</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">Solar radiation, wind speed, temperature</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">NASA</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">Compute renewable energy feasibility</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">Copernicus Climate Data API</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">Climate change projections, historical weather patterns</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">European Union</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">Long-term climate risk forecasting</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">Air Quality & Pollution</h4>
                            <p className="text-gray-700 dark:text-gray-300 mb-2">
                                Used to determine pollution levels affecting sustainability scoring and feasibility.
                            </p>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white dark:bg-gray-700 rounded-lg overflow-hidden">
                                    <thead className="bg-green-100 dark:bg-gray-600">
                                        <tr>
                                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">API Name</th>
                                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">Data Provided</th>
                                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">Source</th>
                                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">Usage</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                                        <tr>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">OpenAQ API</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">Real-time and historical air quality (PM2.5, NO₂, O₃)</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">OpenAQ (Global)</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">Assign pollution level score</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">World Air Quality Index API</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">Global air pollution data (AQI)</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">WAQI</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">Compute pollution risk</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">Disaster Risk & Hazard Data</h4>
                            <p className="text-gray-700 dark:text-gray-300 mb-2">
                                Required for flood risk, earthquake risk, and infrastructure vulnerability assessment.
                            </p>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white dark:bg-gray-700 rounded-lg overflow-hidden">
                                    <thead className="bg-green-100 dark:bg-gray-600">
                                        <tr>
                                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">API Name</th>
                                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">Data Provided</th>
                                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">Source</th>
                                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">Usage</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                                        <tr>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">USGS Earthquake API</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">Real-time and historical seismic activity</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">USGS</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">Compute earthquake risk</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">NASA FIRMS (Fire & Flood)</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">Active fires, flood mapping</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">NASA</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">Identify fire and flood risks</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">Copernicus Emergency Management API</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">Flood and disaster maps</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">EU Copernicus</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">Determine disaster-prone zones</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">Biodiversity & Ecosystem Health</h4>
                            <p className="text-gray-700 dark:text-gray-300 mb-2">
                                Used to calculate biodiversity impact, conservation feasibility, and sustainability scoring.
                            </p>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white dark:bg-gray-700 rounded-lg overflow-hidden">
                                    <thead className="bg-green-100 dark:bg-gray-600">
                                        <tr>
                                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">API Name</th>
                                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">Data Provided</th>
                                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">Source</th>
                                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">Usage</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                                        <tr>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">IUCN Red List API</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">Threatened species, extinction risk</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">IUCN</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">Assess biodiversity threats</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">GBIF Biodiversity API</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">Species occurrence data</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">GBIF</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">Compute ecosystem health</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">Protected Planet API</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">Global protected areas and conservation sites</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">UNEP-WCMC</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">Verify land-use compliance</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">Renewable Energy & Infrastructure Feasibility</h4>
                            <p className="text-gray-700 dark:text-gray-300 mb-2">
                                Evaluate clean energy potential and urban infrastructure risks.
                            </p>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white dark:bg-gray-700 rounded-lg overflow-hidden">
                                    <thead className="bg-green-100 dark:bg-gray-600">
                                        <tr>
                                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">API Name</th>
                                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">Data Provided</th>
                                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">Source</th>
                                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">Usage</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                                        <tr>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">NREL Solar API</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">Solar radiation, photovoltaic potential</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">U.S. National Renewable Energy Lab</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">Assess solar energy feasibility</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">Wind Toolkit API</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">Wind energy resource assessment</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">NREL</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">Compute wind energy potential</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">Global Power Plant Database API</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">Existing energy infrastructure</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">World Resources Institute</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">Identify energy source dependency</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">Water Resources & Ocean Sustainability</h4>
                            <p className="text-gray-700 dark:text-gray-300 mb-2">
                                Assess feasibility of water-based sustainability projects (e.g., mangrove restoration).
                            </p>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white dark:bg-gray-700 rounded-lg overflow-hidden">
                                    <thead className="bg-green-100 dark:bg-gray-600">
                                        <tr>
                                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">API Name</th>
                                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">Data Provided</th>
                                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">Source</th>
                                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">Usage</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                                        <tr>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">Copernicus Marine Service API</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">Sea surface temperature, wave height, ocean pollution</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">Copernicus</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">Assess marine project feasibility</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">NOAA CO-OPS API</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">Tides, currents, water levels</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">NOAA</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">Identify coastal flooding risks</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">Policy Compliance & Regulations</h4>
                            <p className="text-gray-700 dark:text-gray-300 mb-2">
                                Cross-checks project feasibility against national and global sustainability laws.
                            </p>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white dark:bg-gray-700 rounded-lg overflow-hidden">
                                    <thead className="bg-green-100 dark:bg-gray-600">
                                        <tr>
                                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">API Name</th>
                                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">Data Provided</th>
                                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">Source</th>
                                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">Usage</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                                        <tr>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">Climate Watch Policy Database</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">Global climate policies and NDCs</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">World Resources Institute</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">Verify policy compliance</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">OECD Environmental Data API</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">Environmental laws, carbon pricing</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">OECD</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">Assess regulatory alignment</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">UN Sustainable Development Goals API</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">SDG progress tracking</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">United Nations</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">Align with sustainability benchmarks</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">Funding & Grants</h4>
                            <p className="text-gray-700 dark:text-gray-300 mb-2">
                                Identify funding opportunities for sustainability projects.
                            </p>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white dark:bg-gray-700 rounded-lg overflow-hidden">
                                    <thead className="bg-green-100 dark:bg-gray-600">
                                        <tr>
                                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">API Name</th>
                                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">Data Provided</th>
                                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">Source</th>
                                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">Usage</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                                        <tr>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">Green Climate Fund Database</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">Sustainability project grants</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">UN Green Climate Fund</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">Show funding sources</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">World Bank Project API</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">Global sustainability investments</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">World Bank</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">Find grants for green initiatives</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="mt-8">
                            <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">Implementing the Sustainability Formula</h4>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                These APIs provide the data needed to calculate comprehensive sustainability scores using a weighted formula approach:
                            </p>
                            <div className="bg-white dark:bg-gray-600 p-4 rounded-lg mb-4">
                                <p className="text-center font-mono text-gray-800 dark:text-gray-200">
                                    SustainabilityScore = (W₁ × EnvironmentalImpact) + (W₂ × ClimateRisk) + (W₃ × PolicyCompliance) + ...
                                </p>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300">
                                The implementation process involves fetching raw environmental data, normalizing values to a 0-100 scale,
                                applying appropriate weight factors based on project priorities, computing the weighted average,
                                categorizing risks (e.g., AQI {'>'}  100 = high pollution risk), and cross-checking project feasibility
                                against relevant laws and regulations. This approach ensures a comprehensive assessment that
                                considers multiple sustainability dimensions.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-6">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Sources: The information and models above are supported by reputable sources, including United Nations and IPCC reports,
                    peer-reviewed research (Elsevier, Wiley, MDPI), government agencies (EPA, national civil protection), and official standards
                    documentation.
                </p>
            </div>
        </div>
    );
} 