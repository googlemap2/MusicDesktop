using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Forms;
using CefSharp;
using CefSharp.WinForms;

namespace Music
{
    static class Program
    {
        /// <summary>
        /// The main entry point for the application.
        /// </summary>
        [STAThread]
        static void Main()
        {
            CefSettings settings = new CefSettings()
            {
                RootCachePath = System.Windows.Forms.Application.StartupPath + "\\Data\\Cache\\",
                CachePath = System.Windows.Forms.Application.StartupPath + "\\Data\\Cache\\Common\\"
            };
            settings.DisableGpuAcceleration();
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);
            Application.Run(new MyMusic());
        }
    }
}

