using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Music
{
    public class Hepler
    {
      public Hepler()
        {

        }
        private static string mainPath = System.Windows.Forms.Application.StartupPath;
        private static string fDB = null;
        public  string path;

        public static string MainPath { get => mainPath; set => mainPath = value; }
        public static string FDB { get => fDB; set => fDB = value; }
        public  string Path { get => path; set => path = value; }
        public List<string> listPath;
        public string getDialog()
        {
            string Address = FDB;
            return Address;
        }
       
    }
}
