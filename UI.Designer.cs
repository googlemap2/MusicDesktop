namespace Music
{
    partial class UI
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.ListMenu = new System.Windows.Forms.Panel();
            this.SuspendLayout();
            // 
            // ListMenu
            // 
            this.ListMenu.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(45)))), ((int)(((byte)(52)))), ((int)(((byte)(54)))));
            this.ListMenu.Dock = System.Windows.Forms.DockStyle.Left;
            this.ListMenu.Location = new System.Drawing.Point(0, 0);
            this.ListMenu.Name = "ListMenu";
            this.ListMenu.Size = new System.Drawing.Size(38, 450);
            this.ListMenu.TabIndex = 0;
            this.ListMenu.MouseHover += new System.EventHandler(this.ListMenu_MouseHover);
            // 
            // UI
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(800, 450);
            this.Controls.Add(this.ListMenu);
            this.Name = "UI";
            this.Text = "UIExtension";
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Panel ListMenu;
    }
}