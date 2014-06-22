namespace AQUA.Project
{
    using System.Collections.Generic;

    /// <summary>
    /// AQUA Project Configuration
    /// </summary>
    public class Config
    {
        /// <summary>
        /// a short but unique id for the project
        /// </summary>
        public string id { get; set; }

        /// <summary>
        /// a descriptive name of the project
        /// </summary>
        public string name { get; set; }

        /// <summary>
        /// name and email of the the teams or individuals that worked on the project
        /// </summary>
        public string by { get; set; }

        /// <summary>
        /// Where to find the markdown file of the project readme (used as the index documentation page)
        /// </summary>
        public string readme { get; set; }

        /// <summary>
        /// Where to find all source code written for the project
        /// </summary>
        public List<string> src { get; set; }

        /// <summary>
        /// Everything needed to run unit tests
        /// </summary>
        public Unit unit { get; set; }

        /// <summary>
        /// Everything needed to run end-to-end tests
        /// </summary>
        public E2e e2e { get; set; }

        /// <summary>
        /// Where to find all the JavaScript written for the project, including specs (used for linting)
        /// </summary>
        public List<string> alljs { get; set; }

        /// <summary>
        /// Where to find all type definitions used by the project
        /// </summary>
        public List<string> types { get; set; }
    }

    /// <summary>
    /// Unit Test Configuration
    /// </summary>
    public class Unit
    {
        /// <summary>
        /// Where to find the scripts the project depends on (such as AngularJS or jQuery)
        /// </summary>
        public List<string> deps { get; set; }

        /// <summary>
        /// Where to find file(s) containing the expected global variables used by your project.
        /// </summary>
        public List<string> globals { get; set; }

        /// <summary>
        /// Where to find any mocks used by the project unit tests
        /// </summary>
        public List<string> mocks { get; set; }

        /// <summary>
        /// Where to find all of the projects unit tests
        /// </summary>
        public List<string> tests { get; set; }
    }

    /// <summary>
    /// End-to-End Test Configuration
    /// </summary>
    public class E2e
    {
        /// <summary>
        /// Where to find all of the projects end-to-end tests
        /// </summary>
        public List<string> tests { get; set; }

        /// <summary>
        /// Where to find the page objects used by the project end-to-end tests
        /// </summary>
        public List<string> pgobj { get; set; }
    }
}