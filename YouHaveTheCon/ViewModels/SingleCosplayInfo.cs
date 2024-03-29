﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using YouHaveTheCon.Models;

namespace YouHaveTheCon.ViewModels
{
    public class SingleCosplayInfo
    {
        public int CosplayPiecesId { get; set; }
        public string PieceName { get; set; }
        public int TodoId { get; set; }
        public int PercentDone { get; set; }
        public int CompletionHoursEstimate { get; set; }
        public int CompletionMinutesEstimate { get; set; }
        public string PieceImageUrl { get; set; }
        public string CosplayImageUrl { get; set; }
        public int ExpenseId { get; set; }
        public int CosplayId { get; set; }
        public string BodyPartName { get; set; }
        public List<TodoItems> TodoItems { get; set; }
    }
}
