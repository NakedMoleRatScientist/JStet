
describe 'Server database'
  describe '.getList'
    it 'should return a list of high score and their name'
      var database = Database();
      var list = database.getList();
      expect(list).to(have,2,names);
    end
  end
end