beforeEach(function() {
  clock.reset();
});

describe('clock', function() {
  it('is a Clock', function() {
    expect(clock).to.be.instanceof(Clock);
  });

  describe('.start()', function() {
    it('is a function', function() {
      expect(clock.start).to.be.a('function');
    });

    it('starts the clock', function() {
      clock.start();
      expect(clock.get('running')).to.equal(true);
    });

    it('dispatches an event', function(done) {
      var callback = sinon.spy();
      var listener = function() {
        callback();
      };

      window.addEventListener('tick', listener, false);

      clock.start();

      setTimeout(function() {
        window.removeEventListener('tick', listener, false);
        expect(callback.callCount).to.equal(1);
        done();
      }, clock.get('interval'));
    });

    it('is chainable', function() {
      expect(clock.start()).to.be.instanceof(Clock);
    });
  });

  describe('.stop()', function() {
    it('is a function', function() {
      expect(clock.stop).to.be.a('function');
    });
  
    it('stops clock', function() {
      clock.stop();
      expect(clock.get('running')).to.equal(false);
    });

    it('is chainable', function() {
      expect(clock.stop()).to.be.instanceof(Clock);
    });
  });

  describe('.reset()', function() {
    it('is a function', function() {
      expect(clock.reset).to.be.a('function');
    });

    it('stops the clock', function() {
      clock.start();
      clock.reset();
      expect(clock.get('running')).to.equal(false);
    });

    it('resets the clock interval to the default', function() {
      clock.reset();
      expect(clock.get('interval')).to.equal(clock.get('interval', 'default'));
    });

    it('is chainable', function() {
      expect(clock.reset()).to.be.instanceof(Clock);
    });
  });

  describe('.set()', function() {
    it('is a function', function() {
      expect(clock.set).to.be.a('function');
    });

    it('sets values', function() {
      clock.set('interval', 4000);
      expect(clock.get('interval', 4000));
    });

    it('is chainable', function() {
      expect(clock.set('interval', 4000)).to.be.instanceof(Clock);
    });
  });

  describe('.get()', function() {
    it('is a function', function() {
      expect(clock.get).to.be.a('function');
    });

    it('returns data for known keys', function() {
      clock.start();
      expect(clock.get('running')).to.equal(true);
    });

    it('returns default values when the switch is set', function() {
      expect(clock.get('interval', 'default')).to.be.a('number');
    });

    it('returns undefined for unknown keys', function() {
      expect(clock.get('bad key')).to.be.undefined;
    });
  });

});