﻿using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Music
{
    public partial class UI : Form
    {
        public UI()
        {
            InitializeComponent();
        }

        private void ListMenu_MouseHover(object sender, EventArgs e)
        {
            ListMenu.Width = 500;
        }
    }
}
