using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace Vish.Hubs
{
    [HubName("TicTacToe")]
    public class TicTacToe: Hub
    {
        public void Refresh(int pos)
        {
            Clients.AllExcept(Context.ConnectionId).ScopeApply(pos);
        }
        public void Reload()
        {
            Clients.All.Relaod();
        }
    }
}