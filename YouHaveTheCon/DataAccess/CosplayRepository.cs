using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace YouHaveTheCon.DataAccess
{
    public class CosplayRepository
    {
        string ConnectionString;
        public CosplayRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("YouHaveTheConDB");
        }
    }
}
