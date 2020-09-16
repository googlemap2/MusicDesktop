using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.IO;
using CefSharp;
using CefSharp.WinForms;


namespace Music
{
    public partial class MyMusic : Form
    {
        Hepler getfile = new Hepler();
        public List<string> ListPath = new List<string>();
        protected bool clickBtn = false;
        protected Button btn_dialogF;
        public FolderBrowserDialog fbd;
        private ChromiumWebBrowser browser;
        public bool check = false;
        private bool canExecute = false;
        public MyMusic()
        {
            InitializeComponent();
            createBtn();
            InitializeChromeBrowser();
            btn_dialogF.Click += BrowserDialog;

        }

        private void InitializeChromeBrowser()
        {
            browser = new ChromiumWebBrowser(Hepler.MainPath + "\\Data\\index.html");
            browser.BrowserSettings.FileAccessFromFileUrls = CefState.Enabled; // Cho phép truy cập file
            browser.BrowserSettings.UniversalAccessFromFileUrls = CefState.Enabled; // Cho phép truy cập file mức đa dạng hơn
            browser.JavascriptObjectRepository.Register("FBD", getfile, true);

            this.Controls.Add(browser);
            browser.Dock = DockStyle.Fill;

            var finalBounds = new Rectangle(Screen.PrimaryScreen.WorkingArea.X,
                Screen.PrimaryScreen.WorkingArea.Y,
                (int)(Screen.PrimaryScreen.WorkingArea.Width * 0.96),
                (int)(Screen.PrimaryScreen.WorkingArea.Height * 0.9));

            this.Bounds = finalBounds;


            browser.IsBrowserInitializedChanged += (sender, e) =>
            {
                if (browser.IsBrowserInitialized)
                {
                    browser.ShowDevTools();
                }
            };

            browser.LoadingStateChanged += SetDynamicsBool;
        }
        protected void SetDynamicsBool(object sender, LoadingStateChangedEventArgs e)
        {
            if (!browser.IsLoading)
                this.canExecute = true;
        }
        protected void createBtn()
        {
            btn_dialogF = new Button();
            btn_dialogF.Anchor = (AnchorStyles.Top | AnchorStyles.Right);
            this.Controls.Add(btn_dialogF);
            btn_dialogF.Location = new Point(600, 1);
            btn_dialogF.Width = 100;
            btn_dialogF.Height = 30;

            btn_dialogF.Cursor = Cursors.Hand;//lấy con trỏ chuột khi hover

            btn_dialogF.FlatStyle = FlatStyle.Flat;
            /*     btn_dialogF.FlatAppearance.BorderColor = Color.Red;*/
            btn_dialogF.FlatAppearance.BorderSize = 0;
            btn_dialogF.BackColor = ColorTranslator.FromHtml("#0a0a0a");//custom color
            btn_dialogF.Font = new Font("Arial", 10, FontStyle.Regular, GraphicsUnit.Point);
            btn_dialogF.ForeColor = Color.White;//text color
            btn_dialogF.Text = "Chọn folder";


            Btn_Hover();

            this.Controls.Add(btn_dialogF);
        }

        public void BrowserDialog(object sender, EventArgs e)

        {
            btn_dialogF.NotifyDefault(false);
            ListPath.Clear();
            using (fbd = new FolderBrowserDialog()
            {
                Description = "Select the folder containing the music"
            })
            {
                if (fbd.ShowDialog() == DialogResult.OK)
                {
                    foreach (string item in Directory.GetFiles(fbd.SelectedPath))
                    {
                        FileInfo fi = new FileInfo(item);
                        /*                         getfile.fileName(fi.FullName);
                                                ExecuteScript("getPath()");*/
                        /* getfile.Path = fi.FullName;*/
                        var finalResult = fi.FullName.Replace("\\", "/");
                        ExecuteScript("pushList('" + finalResult + "')");

                    }
                    ExecuteScript("pushListSong()");
                    ExecuteScript("control.locationTitlePlaying()");
                }
            }

            /* fbd = new FolderBrowserDialog();
             fbd.RootFolder = Environment.SpecialFolder.Desktop;
             fbd.Description = "Select the folder containing the music";
             fbd.ShowNewFolderButton = false;

             if (fbd.ShowDialog() == DialogResult.OK)
             {
                 Hepler.FDB = fbd.SelectedPath;
                 ExecuteScript("getPath()");
             }*/
        }

        public void executeS()
        {
            ExecuteScript("pushList(" + ListPath[0] + ")");
        }

        private void ExecuteScript(string script)
        {
            if (this.canExecute)
                browser.ExecuteScriptAsync(script);
        }
        protected void Btn_Hover()
        {
            btn_dialogF.MouseHover += (sender, e) =>
            {
                btn_dialogF.BackColor = Color.Red;
            };

            btn_dialogF.MouseLeave += (sender, e) =>
            {
                btn_dialogF.BackColor = ColorTranslator.FromHtml("#0a0a0a");
            };
        }




    }
}
