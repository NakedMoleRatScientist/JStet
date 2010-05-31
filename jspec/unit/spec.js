
describe 'Mode'
  describe '.switch(1)'
    it 'switch to game over mode'
      test = new Mode();
      test.switch(1);
      test.status.should.be(1);
    end
  end
end