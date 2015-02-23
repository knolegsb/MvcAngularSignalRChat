using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using System.Threading;

namespace MvcAngularSignalRChat.Hubs
{
    [HubName("chat")]
    public class ChatHub : Hub
    {
        // C -> S
        public void ClientToServer(string msg)
        {
            // S -> Cs
            Clients.All.serverToClient(msg);
        }

        //[2] Group Chatting
        public void SendMessage(ChatData chat)
        {
            //Clients.All.receiveMessage(chat.Name + ": " + chat.Message);
            Clients.Group(chat.Room).receiveMessage(chat.Name + ": " + chat.Message);
        }
        public void JoinRoom(string room, string name)
        {
            Clients.OthersInGroup(room).newNotification(name + " : entered.");
            Groups.Add(Context.ConnectionId, room);
        }
        public void LeaveRoom(string room, string name)
        {
            Clients.OthersInGroup(room).newNotification(name + " : gone.");
            Groups.Remove(Context.ConnectionId, room);
        }        

        //[3] hit count
        private static int _hitCounter = 0; // # of visits 
        public override System.Threading.Tasks.Task OnConnected()
        {
            Interlocked.Increment(ref _hitCounter); // 1++
            Clients.All.hitRecoreded(_hitCounter);
            return base.OnConnected();
        }
        public override System.Threading.Tasks.Task OnDisconnected()
        {
            Interlocked.Decrement(ref _hitCounter); // 1--
            Clients.All.hitRecoreded(_hitCounter);
            return base.OnDisconnected();
        }

    }

    // chat data
    public class ChatData
    {
        public string Room { get; set; }
        public string Name { get; set; }
        public string Message { get; set; }
    }
}