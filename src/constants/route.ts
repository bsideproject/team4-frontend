const ROUTE = {
  Main: "Main",
  Login: "Login",
  Checklist: {
    Page: "ChecklistPage",
    Quick: "Quick",
    Schedule: "Schedule",
    CreateTodo: "CreateTodo",
    ModifyTodo: "ModifyTodo"
  },
  Setting: {
    Page: "SettingPage",
    Main: "SettingMain",
    Profile: "MyProfile",
    Licence: "Licence",
    Notice: {
      List: "List",
      Detail: "Detail"
    },
    Feedback: "Feedback",
    Withdraw: "Withdraw"
  },
  Group: {
    Page: "GroupPage",
    Info: "Group",
    Invite: "Invite"
  },
  Pet: {
    Page: "PetPage",
    Create: "CreatePet",
    Modify: "ModifyPet",
    Profile: "PetProfile",
    Share: "PetShare"
  },
  Nurture: {
    Page: "NurturePage",
    Main: "NurtureMain",
    Anomalies: {
      Create: "CreateAnomalies",
      Modify: "ModifyAnomalies"
    },
    OneLineDiary: {
      Create: "CreateOneLineDiary",
      Modify: "ModifyOneLineDiary",
    }

  }
} as const
type ROUTE = typeof ROUTE[keyof typeof ROUTE]

export default ROUTE