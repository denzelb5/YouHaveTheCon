using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace YouHaveTheCon.Commands
{
    public class AddCosplayPieceCommand
    {
       
        public string PieceName { get; set; }
        public int PercentDone { get; set; }
        public int CompletionHoursEstimate { get; set; }
        public int CompletionMinutesEstimate { get; set; }
        public string PieceImageUrl { get; set; }
        public int CosplayId { get; set; }
        public string BodyPartName { get; set; }
    }
}
